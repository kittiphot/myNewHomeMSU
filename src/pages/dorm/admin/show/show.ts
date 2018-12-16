import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../../../home/home'
import { DormAdminModalPage } from '../modal/modal'

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowDormPage {

  private key
  private items
  private comments
  private average

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
      status: ''
    }
    this.getDorm()
    this.getScores()
    this.getComments()
  }

  goToHomePage() {
    this.closeModal()
    this.navCtrl.push(HomePage)
  }

  getDorm() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.afDatabase.list('dorm').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.items.key = data.key
          this.items.dormName = data.payload.val()['dormName']
          this.items.lat = data.payload.val()['lat']
          this.items.lng = data.payload.val()['lng']
          this.items.openClosed = data.payload.val()['openClosed']
          this.items.dailyAirConditioner = data.payload.val()['dailyAirConditioner']
          this.items.monthlyAirConditioner = data.payload.val()['monthlyAirConditioner']
          this.items.termAirConditioner = data.payload.val()['termAirConditioner']
          this.items.dailyFan = data.payload.val()['dailyFan']
          this.items.monthlyFan = data.payload.val()['monthlyFan']
          this.items.termFan = data.payload.val()['termFan']
          this.items.phoneNumber = data.payload.val()['phoneNumber']
          this.items.contact = data.payload.val()['contact']
          this.items.type = data.payload.val()['type']
          if (data.payload.val()['status'] == 1) {
            this.items.status = 'ใช้งาน'
          }
          else {
            this.items.status = 'ยกเลิกการใช้งาน'
          }
        }
      })
      loading.dismiss()
    })
  }

  getScores() {
    this.afDatabase.list('score/dorm/' + this.key).snapshotChanges().subscribe(data => {
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
    this.afDatabase.list('comment/dorm/' + this.key).snapshotChanges().subscribe(data => {
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
      this.afDatabase.list('dorm').update(
        key, {
          status: '0'
        }
      )
    }
    else {
      this.afDatabase.list('dorm').update(
        key, {
          status: '1'
        }
      )
    }
    this.presentToast('เปลี่ยนสถานะสำเร็จ')
  }

  update(key) {
    let profileModal = this.modalCtrl.create(DormAdminModalPage, {
      key: key
    })
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('score/dorm').remove(key)
    this.afDatabase.list('comment/dorm').remove(key)
    // this.afDatabase.list('dorm').remove(key)
    this.afDatabase.list('dorm').update(
      key, {
        status: '0'
      }
    )
    this.presentToast('ลบสำเร็จ')
    this.closeModal()
  }

  deleteComment(key) {
    this.afDatabase.list('comment/dorm/' + this.key).remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  navigate() {
    window.open("geo:" + this.items.lat + "," + this.items.lng + "?q=" + this.items.dormName)
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
