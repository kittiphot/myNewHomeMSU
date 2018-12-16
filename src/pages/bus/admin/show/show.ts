import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../../../home/home'
import { BusAdminModalPage } from '../modal/modal'

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowBusPage {

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
      nameBus: '',
      lat: '',
      lng: '',
      busStopDetail: '',
      status: ''
    }
    this.getBus()
    this.getScores()
    this.getComments()
  }

  goToHomePage() {
    this.closeModal()
    this.navCtrl.push(HomePage)
  }

  getBus() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.afDatabase.list('bus').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.items.key = data.key
          this.items.nameBus = data.payload.val()['nameBus']
          this.items.lat = data.payload.val()['lat']
          this.items.lng = data.payload.val()['lng']
          this.items.busStopDetail = data.payload.val()['busStopDetail']
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
    this.afDatabase.list('score/bus/' + this.key).snapshotChanges().subscribe(data => {
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
    this.afDatabase.list('comment/bus/' + this.key).snapshotChanges().subscribe(data => {
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
      this.afDatabase.list('bus').update(
        key, {
          status: '0'
        }
      )
    }
    else {
      this.afDatabase.list('bus').update(
        key, {
          status: '1'
        }
      )
    }
    this.presentToast('เปลี่ยนสถานะสำเร็จ')
  }

  update(key) {
    let profileModal = this.modalCtrl.create(BusAdminModalPage, {
      key: key
    })
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('score/bus').remove(key)
    this.afDatabase.list('comment/bus').remove(key)
    // this.afDatabase.list('bus').remove(key)
    this.afDatabase.list('bus').update(
      key, {
        stastus: 0
      }
    )
    this.presentToast('ลบสำเร็จ')
    this.closeModal()
  }

  deleteComment(key) {
    this.afDatabase.list('comment/bus/' + this.key).remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  navigate() {
    window.open("geo:" + this.items.lat + "," + this.items.lng + "?q=" + this.items.nameBus)
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
