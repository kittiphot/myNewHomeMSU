import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { CafeAdminModalPage } from '../modal/modal'
import { CafeAdminSearchPage } from '../search/search'

@Component({
  selector: 'page-cafe',
  templateUrl: 'cafe.html',
})
export class CafeAdminPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('cafe')
    this.items = []
  }

  ionViewDidLoad() {
    this.getCafe()
  }

  getCafe() {
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
            cafeName: data.payload.val()['cafeName'],
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: data.key,
            cafeName: data.payload.val()['cafeName'],
            status: 'ยกเลิกการใช้งาน'
          })
        }
      })
      loading.dismiss()
    })
  }

  create() {
    let profileModal = this.modalCtrl.create(CafeAdminModalPage);
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(CafeAdminModalPage, {
      key: key
    });
    profileModal.present()
  }

  delete(key) {
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  search() {
    this.items = []
    let searchModal = this.modalCtrl.create(CafeAdminSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        if (value.status == 1) {
          this.items.push({
            key: value.key,
            cafeName: value.cafeName,
            lat: value.lat,
            lng: value.lng,
            price: value.price,
            openClosed: value.openClosed,
            phoneNumber: value.phoneNumber,
            contact: value.contact,
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: value.key,
            cafeName: value.cafeName,
            lat: value.lat,
            lng: value.lng,
            price: value.price,
            openClosed: value.openClosed,
            phoneNumber: value.phoneNumber,
            contact: value.contact,
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
