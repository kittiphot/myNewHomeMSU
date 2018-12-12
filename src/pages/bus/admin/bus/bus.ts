import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { BusAdminModalPage } from '../modal/modal'
import { BusAdminSearchPage } from '../search/search'
import { BusAdminCommentPage } from '../comment/comment'
import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html',
})
export class BusAdminPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('bus')
    this.items = []
  }

  ionViewDidLoad() {
    this.getBus()
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  getBus() {
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
            nameBus: data.payload.val()['nameBus'],
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: data.key,
            nameBus: data.payload.val()['nameBus'],
            status: 'ยกเลิกการใช้งาน'
          })
        }
      })
      loading.dismiss()
    })
  }

  goToCommentPage(key) {
    let profileModal = this.modalCtrl.create(BusAdminCommentPage, {
      key: key
    })
    profileModal.present()
  }

  create() {
    let profileModal = this.modalCtrl.create(BusAdminModalPage)
    profileModal.present()
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
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  search() {
    this.items = []
    let searchModal = this.modalCtrl.create(BusAdminSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        if (value.status == 1) {
          this.items.push({
            key: value.key,
            nameBus: value.nameBus,
            lat: value.lat,
            lng: value.lng,
            detail: value.detail,
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: value.key,
            nameBus: value.nameBus,
            lat: value.lat,
            lng: value.lng,
            detail: value.detail,
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
