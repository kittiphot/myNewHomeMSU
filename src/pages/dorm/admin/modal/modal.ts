import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Camera, CameraOptions } from '@ionic-native/camera'

import { HomePage } from '../../../home/home'

declare var google

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class DormAdminModalPage {

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
    this.itemsRef = this.afDatabase.list('dorm')
    this.key = navParams.get('key')
    this.params = {
      dormName: '',
      lat: '',
      lng: '',
      openClosed: '',
      dailyAirConditioner: '',
      monthlyAirConditioner: '',
      termAirConditioner: '',
      dailyFan: '',
      monthlyFan: '',
      termFan: '',
      phoneNumber: '',
      contact: '',
      type: '',
      img: ''
    }
  }

  ionViewDidLoad() {
    this.loadMap()
  }
  
  goToHomePage() {
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
          this.params.dormName = data.payload.val()['dormName']
          this.params.lat = data.payload.val()['lat']
          this.params.lng = data.payload.val()['lng']
          this.params.openClosed = data.payload.val()['openClosed']
          this.params.dailyAirConditioner = data.payload.val()['dailyAirConditioner']
          this.params.monthlyAirConditioner = data.payload.val()['monthlyAirConditioner']
          this.params.termAirConditioner = data.payload.val()['termAirConditioner']
          this.params.dailyFan = data.payload.val()['dailyFan']
          this.params.monthlyFan = data.payload.val()['monthlyFan']
          this.params.termFan = data.payload.val()['termFan']
          this.params.phoneNumber = data.payload.val()['phoneNumber']
          this.params.contact = data.payload.val()['contact']
          this.params.type = data.payload.val()['type']
        }
      })
    })
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((imageData) => {
      this.params.img = 'data:image/jpeg;base64,' + imageData
    }, (err) => {
      console.log(err)
    })
  }

  onSubmit(myform) {
    let params = {
      dormName: myform.value.dormName,
      lat: myform.value.lat,
      lng: myform.value.lng,
      openClosed: '',
      dailyAirConditioner: myform.value.dailyAirConditioner,
      monthlyAirConditioner: myform.value.monthlyAirConditioner,
      termAirConditioner: myform.value.termAirConditioner,
      dailyFan: myform.value.dailyFan,
      monthlyFan: myform.value.monthlyFan,
      termFan: myform.value.termFan,
      phoneNumber: myform.value.phoneNumber,
      contact: myform.value.contact,
      type: myform.value.type,
      status: '1'
    }
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
        this.presentToast('บันทึกสำเร็จ')
      }
      else {
        this.itemsRef.update(
          this.key, {
            dormName: params.dormName,
            lat: params.lat,
            lng: params.lng,
            openClosed: params.openClosed,
            dailyAirConditioner: params.dailyAirConditioner,
            monthlyAirConditioner: params.monthlyAirConditioner,
            termAirConditioner: params.termAirConditioner,
            dailyFan: params.dailyFan,
            monthlyFan: params.monthlyFan,
            termFan: params.termFan,
            phoneNumber: params.phoneNumber,
            type: params.type,
            contact: params.contact
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
