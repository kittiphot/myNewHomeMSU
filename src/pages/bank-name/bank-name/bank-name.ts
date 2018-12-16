import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController, AlertController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { BankNameModalPage } from '../modal/modal'
import { BankNameSearchPage } from '../search/search'
import { HomePage } from '../../home/home'

@Component({
  selector: 'page-bank-name',
  templateUrl: 'bank-name.html',
})
export class BankNamePage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.itemsRef = this.afDatabase.list('bankName')
    this.items = []
  }

  ionViewDidLoad() {
    this.getBuilding()
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  getBuilding() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      this.items = []
      data.forEach(data => {
        this.items.push({
          key: data.key,
          bankName: data.payload.val()['bankName']
        })
      })
      loading.dismiss()
    })
  }

  create() {
    let profileModal = this.modalCtrl.create(BankNameModalPage)
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(BankNameModalPage, {
      key: key
    })
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('bankName/' + key + '/atm').snapshotChanges().subscribe(data => {
      data.forEach(value => {
        this.afDatabase.list('atm').update(
          value.payload.val()['key'], {
            status: '0'
          }
        )
        // this.afDatabase.list('atm').remove(value.payload.val()['key'])
        // this.afDatabase.list('score/atm').remove(value.payload.val()['key'])
        // this.afDatabase.list('comment/atm').remove(value.payload.val()['key'])
      })
    })
    this.afDatabase.list('bankName/' + key + '/bank').snapshotChanges().subscribe(data => {
      data.forEach(value => {
        this.afDatabase.list('bank').update(
          value.payload.val()['key'], {
            status: '0'
          }
        )
        // this.afDatabase.list('bank').remove(value.payload.val()['key'])
        // this.afDatabase.list('score/bank').remove(value.payload.val()['key'])
        // this.afDatabase.list('comment/bank').remove(value.payload.val()['key'])
      })
    })
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  search() {
    this.items = []
    let searchModal = this.modalCtrl.create(BankNameSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        this.items.push({
          key: value.key,
          bankName: value.bankName
        })
      })
    })
    searchModal.present()
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
