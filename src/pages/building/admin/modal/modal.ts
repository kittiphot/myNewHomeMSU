import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Camera, CameraOptions } from '@ionic-native/camera'
import firebase from 'firebase'

import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class BuildingAdminModalPage {

  private itemsRef
  private params
  private key
  private names

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private camera: Camera
  ) {
    this.itemsRef = this.afDatabase.list('building')
    this.key = navParams.get('key')
    this.params = {
      buildingName: '',
      lat: '',
      lng: '',
      initials: '',
      img: '',
      openClosed: ''
    }
  }

  ionViewDidLoad() {
    this.getPlaceProfiles()
    this.getName()
  }

  goToHomePage() {
    this.closeModal()
    this.navCtrl.push(HomePage)
  }

  getPlaceProfiles() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.params.buildingName = data.payload.val()['buildingName']
          this.params.lat = data.payload.val()['lat']
          this.params.lng = data.payload.val()['lng']
          this.params.initials = data.payload.val()['initials']
          this.params.openClosed = data.payload.val()['openClosed']
        }
      })
    })
  }

  getName() {
    this.names = []
    this.afDatabase.list('buildingName').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.names.push({
          key: data.key,
          buildingName: data.payload.val()['buildingName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng']
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
    const imageRef = storageRef.child(`building/${key}.jpg`)
    imageRef.putString(this.params.img, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
    })
  }

  onSubmit(myform) {
    let params = {
      key: '',
      buildingName: myform.value.buildingName,
      lat: '',
      lng: '',
      initials: myform.value.initials,
      openClosed: '',
      status: '1'
    }
    this.names.forEach(data => {
      if (params.buildingName == data.buildingName) {
        params.key = data.key
        params.lat = data.lat
        params.lng = data.lng
      }
    })
    var re = /^[0-9]{2}.[0-9]{2} - [0-9]{2}.[0-9]{2} น.$/
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
            this.afDatabase.list('buildingName/' + params.key + '/building').push(key)
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
            buildingName: params.buildingName,
            lat: params.lat,
            lng: params.lng,
            initials: params.initials.toUpperCase(),
            openClosed: params.openClosed
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
