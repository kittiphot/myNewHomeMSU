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
export class ParkingAdminModalPage {

  @ViewChild("map") mapElement: ElementRef
  private map
  private itemsRef
  private params
  private key

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private camera: Camera
  ) {
    this.itemsRef = this.afDatabase.list('parking')
    this.key = navParams.get('key')
    this.params = {
      parkingName: '',
      lat: '',
      lng: '',
      type: '',
      img: ''
    }
  }

  ionViewDidLoad() {
    this.loadMap()
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
          this.params.parkingName = data.payload.val()['parkingName']
          this.params.lat = data.payload.val()['lat']
          this.params.lng = data.payload.val()['lng']
          this.params.type = data.payload.val()['type']
        }
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
    const imageRef = storageRef.child(`parking/${key}.jpg`)
    imageRef.putString(this.params.img, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
    })
  }

  onSubmit(myform) {
    let params = {
      parkingName: myform.value.parkingName,
      lat: myform.value.lat,
      lng: myform.value.lng,
      type: myform.value.type,
      status: '1'
    }
    if (typeof this.key == 'undefined') {
      this.itemsRef.push(params)
      let count = 0
      this.itemsRef.snapshotChanges().subscribe(data => {
        if (count == 0) {
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
          parkingName: params.parkingName,
          lat: params.lat,
          lng: params.lng,
          type: params.type
        }
      )
      this.presentToast('แก้ไขสำเร็จ')
    }
    this.closeModal()
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
