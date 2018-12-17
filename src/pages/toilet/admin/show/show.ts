import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import firebase from 'firebase'

import { HomePage } from '../../../home/home'
import { ToiletAdminModalPage } from '../modal/modal'

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowToiletPage {

  private key
  private items
  private comments
  private average
  private img

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
    this.key = navParams.get('key')
    this.items = {
      key: '',
      buildingName: '',
      lat: '',
      lng: '',
      type: '',
      detail: '',
      status: ''
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.getImage()
    this.getToilet()
    this.getScores()
    this.getComments()
    loading.dismiss()
  }

  goToHomePage() {
    this.closeModal()
    this.navCtrl.push(HomePage)
  }

  getImage() {
    let storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`toilet/${this.key}.jpg`)
    imageRef.getDownloadURL().then(url => {
      this.img = url
    }).catch(function (error) {
    })
  }

  getToilet() {
    this.afDatabase.list('toilet').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.items.key = data.key
          this.items.buildingName = data.payload.val()['buildingName']
          this.items.lat = data.payload.val()['lat']
          this.items.lng = data.payload.val()['lng']
          this.items.type = data.payload.val()['type']
          this.items.detail = data.payload.val()['detail']
          if (data.payload.val()['status'] == 1) {
            this.items.status = 'ใช้งาน'
          }
          else {
            this.items.status = 'ยกเลิกการใช้งาน'
          }
        }
      })
    })
  }

  getScores() {
    this.afDatabase.list('score/toilet/' + this.key).snapshotChanges().subscribe(data => {
      let count = 0
      let sum = 0
      this.average = 0
      data.forEach(data => {
        count++
        sum = sum + data.payload.val()['score']
      })
      this.average = (sum / count).toFixed(2)
      if (this.average == 'NaN') {
        this.average = '0'
      }
    })
  }

  getComments() {
    this.afDatabase.list('comment/toilet/' + this.key).snapshotChanges().subscribe(data => {
      this.comments = []
      data.forEach(data => {
        this.comments.push({
          key: data.key,
          eamil: data.payload.val()['eamil'],
          comment: data.payload.val()['comment']
        })
      })
    })
  }

  changeStatus(key, status) {
    if (status == 'ใช้งาน') {
      this.afDatabase.list('toilet').update(
        key, {
          status: '0'
        }
      )
    }
    else {
      this.afDatabase.list('toilet').update(
        key, {
          status: '1'
        }
      )
    }
    this.presentToast('เปลี่ยนสถานะสำเร็จ')
  }

  update(key) {
    let profileModal = this.modalCtrl.create(ToiletAdminModalPage, {
      key: key
    })
    profileModal.onDidDismiss(data =>
      this.getImage()
    )
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('score/toilet').remove(key)
    this.afDatabase.list('comment/toilet').remove(key)
    this.afDatabase.list('toilet').remove(key)
    // this.afDatabase.list('toilet').update(
    //   key, {
    //     status: '0'
    //   }
    // )
    this.presentToast('ลบสำเร็จ')
    this.closeModal()
  }

  deleteComment(key) {
    this.afDatabase.list('comment/toilet/' + this.key).remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  navigate() {
    window.open("geo:" + this.items.lat + "," + this.items.lng + "?q=" + this.items.buildingName)
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

  presentConfirm(key) {
    let alert = this.alertCtrl.create({
      title: 'ต้องการลบข้อมูลหรือไม่',
      buttons: [
        {
          text: 'ไม่ลบ',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'ลบ',
          handler: () => {
            this.delete(key)
          }
        }
      ]
    })
    alert.present()
  }

}
