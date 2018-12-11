import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { AtmAdminModalPage } from '../modal/modal'
import { AtmAdminSearchPage } from '../search/search'

@Component({
  selector: 'page-atm',
  templateUrl: 'atm.html',
})
export class AtmAdminPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('atm')
    this.items = []
  }

  ionViewDidLoad() {
    this.getAtm()
  }

  getAtm() {
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
            placeName: data.payload.val()['placeName'],
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: data.key,
            placeName: data.payload.val()['placeName'],
            status: 'ยกเลิกการใช้งาน'
          })
        }
      })
      loading.dismiss()
    })
  }

  create() {
    let profileModal = this.modalCtrl.create(AtmAdminModalPage)
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(AtmAdminModalPage, {
      key: key
    })
    profileModal.present()
  }

  delete(key) {
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  search() {
    this.items = []
    let searchModal = this.modalCtrl.create(AtmAdminSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        if (value.status == 1) {
          this.items.push({
            key: value.key,
            placeName: value.placeName,
            lat: value.lat,
            lng: value.lng,
            ATMName: value.ATMName,
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: value.key,
            placeName: value.placeName,
            lat: value.lat,
            lng: value.lng,
            ATMName: value.ATMName,
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
