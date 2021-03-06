import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { ToiletAdminModalPage } from '../modal/modal'
import { ToiletAdminSearchPage } from '../search/search'
import { ToiletAdminCommentPage } from '../comment/comment'
import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-toilet',
  templateUrl: 'toilet.html',
})
export class ToiletAdminPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('toilet')
    this.items = []
  }

  ionViewDidLoad() {
    this.getToilet()
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  getToilet() {
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
            buildingName: data.payload.val()['buildingName'],
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: data.key,
            buildingName: data.payload.val()['buildingName'],
            status: 'ยกเลิกการใช้งาน'
          })
        }
      })
      loading.dismiss()
    })
  }

  goToCommentPage(key) {
    let profileModal = this.modalCtrl.create(ToiletAdminCommentPage, {
      key: key
    })
    profileModal.present()
  }

  create() {
    let profileModal = this.modalCtrl.create(ToiletAdminModalPage);
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(ToiletAdminModalPage, {
      key: key
    });
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('score/toilet').remove(key)
    this.afDatabase.list('comment/toilet').remove(key)
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  search() {
    this.items = []
    let searchModal = this.modalCtrl.create(ToiletAdminSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        if (value.status == 1) {
          this.items.push({
            key: value.key,
            buildingName: value.buildingName,
            lat: value.lat,
            lng: value.lng,
            detail: value.detail,
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: value.key,
            buildingName: value.buildingName,
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
