import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { ParkingAdminModalPage } from '../modal/modal'
import { ParkingAdminSearchPage } from '../search/search'

@Component({
  selector: 'page-parking',
  templateUrl: 'parking.html',
})
export class ParkingAdminiPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('parking')
    this.items = []
  }

  ionViewDidLoad() {
    this.getParking()
  }

  getParking() {
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
            parkingName: data.payload.val()['parkingName'],
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: data.key,
            parkingName: data.payload.val()['parkingName'],
            status: 'ยกเลิกการใช้งาน'
          })
        }
      })
      loading.dismiss()
    })
  }

  create() {
    let profileModal = this.modalCtrl.create(ParkingAdminModalPage);
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(ParkingAdminModalPage, {
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
    let searchModal = this.modalCtrl.create(ParkingAdminSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        if (value.status == 1) {
          this.items.push({
            key: value.key,
            parkingName: value.parkingName,
            lat: value.lat,
            lng: value.lng,
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: value.key,
            parkingName: value.parkingName,
            lat: value.lat,
            lng: value.lng,
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
