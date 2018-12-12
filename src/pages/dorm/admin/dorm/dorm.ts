import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { DormAdminModalPage } from '../modal/modal'
import { DormAdminSearchPage } from '../search/search'
import { DormAdminCommentPage } from '../comment/comment'
import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-dorm',
  templateUrl: 'dorm.html',
})
export class DormAdminPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('dorm')
    this.items = []
  }

  ionViewDidLoad() {
    this.getDorm()
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  getDorm() {
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
            dormName: data.payload.val()['dormName'],
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: data.key,
            dormName: data.payload.val()['dormName'],
            status: 'ยกเลิกการใช้งาน'
          })
        }
      })
      loading.dismiss()
    })
  }

  goToCommentPage(key) {
    let profileModal = this.modalCtrl.create(DormAdminCommentPage, {
      key: key
    })
    profileModal.present()
  }

  create() {
    let profileModal = this.modalCtrl.create(DormAdminModalPage);
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(DormAdminModalPage, {
      key: key
    });
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('score/dorm').remove(key)
    this.afDatabase.list('comment/dorm').remove(key)
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  search() {
    this.items = []
    let searchModal = this.modalCtrl.create(DormAdminSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        if (value.status == 1) {
          this.items.push({
            key: value.key,
            dormName: value.dormName,
            lat: value.lat,
            lng: value.lng,
            openClosed: value.openClosed,
            dailyAirConditioner: value.dailyAirConditioner,
            monthlyAirConditioner: value.monthlyAirConditioner,
            termAirConditioner: value.termAirConditioner,
            dailyFan: value.dailyFan,
            monthlyFan: value.monthlyFan,
            termFan: value.termFan,
            phoneNumber: value.phoneNumber,
            contact: value.contact,
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: value.key,
            dormName: value.dormName,
            lat: value.lat,
            lng: value.lng,
            openClosed: value.openClosed,
            dailyAirConditioner: value.dailyAirConditioner,
            monthlyAirConditioner: value.monthlyAirConditioner,
            termAirConditioner: value.termAirConditioner,
            dailyFan: value.dailyFan,
            monthlyFan: value.monthlyFan,
            termFan: value.termFan,
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
