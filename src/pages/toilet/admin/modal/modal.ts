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
export class ToiletAdminModalPage {
  
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
    this.itemsRef = this.afDatabase.list('toilet')
    this.key = navParams.get('key')
    this.params = {
      buildingName: '',
      lat: '',
      lng: '',
      type: '',
      detail: '',
      img: ''
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
          this.params.type = data.payload.val()['type']
          this.params.detail = data.payload.val()['detail']
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
    const imageRef = storageRef.child(`toilet/${key}.jpg`)
    imageRef.putString(this.params.img, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
    })
  }

  onSubmit(myform) {
    let params = {
      key: '',
      buildingName: myform.value.buildingName,
      lat: '',
      lng: '',
      type: myform.value.type,
      detail: myform.value.detail,
      status: '1'
    }
    this.names.forEach(data => {
      if (params.buildingName == data.buildingName) {
        params.key = data.key
        params.lat = data.lat
        params.lng = data.lng
      }
    })
    if (typeof this.key == 'undefined') {
      this.itemsRef.push(params)
      let count = 0
      this.itemsRef.snapshotChanges().subscribe(data => {
        if (count == 0) {
          let key = {
            key: data[data.length - 1].key
          }
          this.afDatabase.list('buildingName/' + params.key + '/toilet').push(key)
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
          type: params.type,
          detail: params.detail
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
