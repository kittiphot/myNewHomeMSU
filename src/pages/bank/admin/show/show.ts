import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import firebase from 'firebase'

import { HomePage } from '../../../home/home'
import { BankAdminModalPage } from '../modal/modal'

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowBankPage {

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
      bankName: '',
      lat: '',
      lng: '',
      openClosed: '',
      status: ''
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.getImage()
    this.getBank()
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
    const imageRef = storageRef.child(`bank/${this.key}.jpg`)
    imageRef.getDownloadURL().then(url => {
      this.img = url
    }).catch(function (error) {
    })
  }

  getBank() {
    this.afDatabase.list('bank').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.items.key = data.key
          this.items.bankName = data.payload.val()['bankName']
          this.items.lat = data.payload.val()['lat']
          this.items.lng = data.payload.val()['lng']
          this.items.openClosed = data.payload.val()['openClosed']
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
    this.afDatabase.list('score/bank/' + this.key).snapshotChanges().subscribe(data => {
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
    this.afDatabase.list('comment/bank/' + this.key).snapshotChanges().subscribe(data => {
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
      this.afDatabase.list('bank').update(
        key, {
          status: '0'
        }
      )
    }
    else {
      this.afDatabase.list('bank').update(
        key, {
          status: '1'
        }
      )
    }
    this.presentToast('เปลี่ยนสถานะสำเร็จ')
  }

  update(key) {
    let profileModal = this.modalCtrl.create(BankAdminModalPage, {
      key: key
    })
    profileModal.onDidDismiss(data =>
      this.getImage()
    )
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('score/bank').remove(key)
    this.afDatabase.list('comment/bank').remove(key)
    this.afDatabase.list('bank').remove(key)
    // this.afDatabase.list('bank').update(
    //   key, {
    //     status: '0'
    //   }
    // )
    this.presentToast('ลบสำเร็จ')
    this.closeModal()
  }

  deleteComment(key) {
    this.afDatabase.list('comment/bank/' + this.key).remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  navigate() {
    window.open("geo:" + this.items.lat + "," + this.items.lng + "?q=" + this.items.bankName)
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
