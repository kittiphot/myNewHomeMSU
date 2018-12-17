import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Camera, CameraOptions } from '@ionic-native/camera'
import firebase from 'firebase'

import { HomePage } from '../../../home/home'

declare var google

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class CafeAdminModalPage {

  @ViewChild("map") mapElement: ElementRef
  private map
  private itemsRef
  private params
  private key
  private types

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private camera: Camera
  ) {
    this.itemsRef = this.afDatabase.list('cafe')
    this.key = navParams.get('key')
    this.params = {
      cafeName: '',
      lat: '',
      lng: '',
      price: '',
      openClosed: '',
      phoneNumber: '',
      contact: '',
      type: '',
      img: ''
    }
  }

  ionViewDidLoad() {
    this.loadMap()
    this.getType()
  }
  
  goToHomePage() {
    this.closeModal()
    this.navCtrl.push(HomePage)
  }

  loadMap() {
    let latLng = new google.maps.LatLng(16.245616, 103.250208)
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
    this.getPlaceProfiles()
    google.maps.event.addListener(this.map, "click", (event) => {
      this.params.lat = event.latLng.lat()
      this.params.lng = event.latLng.lng()
    })
  }

  getPlaceProfiles() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.params.cafeName = data.payload.val()['cafeName']
          this.params.lat = data.payload.val()['lat']
          this.params.lng = data.payload.val()['lng']
          this.params.price = data.payload.val()['price']
          this.params.openClosed = data.payload.val()['openClosed']
          this.params.phoneNumber = data.payload.val()['phoneNumber']
          this.params.contact = data.payload.val()['contact']
          this.params.type = data.payload.val()['type']
        }
      })
    })
  }

  getType() {
    this.types = []
    this.afDatabase.list('cafeType').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.types.push({
          key: data.key,
          CafeType: data.payload.val()['CafeType']
        })
      })
    })
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0
    }
    this.camera.getPicture(options).then((imageData) => {
      this.params.img = 'data:image/jpeg;base64,' + imageData
    }, (err) => {
      console.log(err)
    })
  }

  upload(key) {
    let storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`cafe/${key}.jpg`)
    imageRef.putString(this.params.img, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
    })
  }

  onSubmit(myform) {
    let params = {
      key: '',
      cafeName: myform.value.cafeName,
      lat: myform.value.lat,
      lng: myform.value.lng,
      price: myform.value.price,
      openClosed: '',
      phoneNumber: myform.value.phoneNumber,
      contact: myform.value.contact,
      type: myform.value.type,
      status: '1'
    }
    this.types.forEach(data => {
      if (params.type == data.CafeType) {
        params.key = data.key
      }
    })
    var re = /^[0-9]{2}.[0-9]{2} - [0-9]{2}.[0-9]{2} น.$/;
    if (re.test(myform.value.openClosed)) {
      params.openClosed = myform.value.openClosed
    }
    var re = /^[0-9]{2} ชม.$/
    if (re.test(myform.value.openClosed)) {
      params.openClosed = myform.value.openClosed
    }
    var re = /^-$/
    if (re.test(myform.value.openClosed)) {
      params.openClosed = myform.value.openClosed
    }
    if (params.openClosed != '') {
      if (typeof this.key == 'undefined') {
        this.itemsRef.push(params)
        let count = 0
        this.itemsRef.snapshotChanges().subscribe(data => {
          if (count == 0) {
            let key = {
              key: data[data.length - 1].key
            }
            this.afDatabase.list('cafeType/' + params.key + '/cafe').push(key)
            if (this.params.img) {
              this.upload(data[data.length - 1].key)
            }
          }
          count++
        })
        this.presentToast('บันทึกสำเร็จ')
      }
      else {
        if (this.params.img) {
          this.upload(this.key)
        }
        this.itemsRef.update(
          this.key, {
            cafeName: params.cafeName,
            lat: params.lat,
            lng: params.lng,
            price: params.price,
            openClosed: params.openClosed,
            phoneNumber: params.phoneNumber,
            contact: params.contact,
            type: params.type
          }
        )
        this.presentToast('แก้ไขสำเร็จ')
      }
      this.closeModal()
    }
    else {
      this.presentToast('รูปแบบเวลาเปิด – ปิดอาคารไม่ถูกต้อง')
    }
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    })
    toast.present()
  }

}
