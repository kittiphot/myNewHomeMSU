import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { BankAdminModalPage } from '../modal/modal'
import { BankAdminSearchPage } from '../search/search'
import { BankAdminCommentPage } from '../comment/comment'

@Component({
  selector: 'page-bank',
  templateUrl: 'bank.html',
})
export class BankAdminPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('bank')
    this.items = []
  }

  ionViewDidLoad() {
    this.getBank()
  }

  getBank() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      this.items = []
      data.forEach(data => {
        if (data.payload.val()['status'] == 1) {
          this.items.push({
            key: data.key,
            bankName: data.payload.val()['bankName'],
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: data.key,
            bankName: data.payload.val()['bankName'],
            status: 'ยกเลิกการใช้งาน'
          })
        }
      })
      loading.dismiss()
    })
  }

  goToCommentPage(key) {
    let profileModal = this.modalCtrl.create(BankAdminCommentPage, {
      key: key
    })
    profileModal.present()
  }

  create() {
    let profileModal = this.modalCtrl.create(BankAdminModalPage);
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(BankAdminModalPage, {
      key: key
    });
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('score/bank').remove(key)
    this.afDatabase.list('comment/bank').remove(key)
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  search() {
    this.items = []
    let searchModal = this.modalCtrl.create(BankAdminSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        if (value.status == 1) {
          this.items.push({
            key: value.key,
            bankName: value.bankName,
            lat: value.lat,
            lng: value.lng,
            openClosed: value.openClosed,
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: value.key,
            bankName: value.bankName,
            lat: value.lat,
            lng: value.lng,
            openClosed: value.openClosed,
            status: 'ยกเลิกการใช้งาน'
          })
        }
      })
    })
    searchModal.present()
  }

  changeStatus(key, status) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    if (status == 'ใช้งาน') {
      this.itemsRef.update(
        key, {
          status: '0'
        }
      )
    }
    else {
      this.itemsRef.update(
        key, {
          status: '1'
        }
      )
    }
    this.presentToast('เปลี่ยนสถานะสำเร็จ')
    loading.dismiss()
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
