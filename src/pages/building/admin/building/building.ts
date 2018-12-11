import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { BuildingAdminModalPage } from '../modal/modal'
import { BuildingAdminSearchPage } from '../search/search'

@Component({
  selector: 'page-building',
  templateUrl: 'building.html',
})
export class BuildingAdminPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('building')
    this.items = []
  }

  ionViewDidLoad() {
    this.getBuilding()
  }

  getBuilding() {
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

  create() {
    let profileModal = this.modalCtrl.create(BuildingAdminModalPage)
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(BuildingAdminModalPage, {
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
    let searchModal = this.modalCtrl.create(BuildingAdminSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        if (value.status == 1) {
          this.items.push({
            key: value.key,
            buildingName: value.buildingName,
            lat: value.lat,
            lng: value.lng,
            initials: value.initials,
            openClosed: value.openClosed,
            status: 'ใช้งาน'
          })
        }
        else {
          this.items.push({
            key: value.key,
            buildingName: value.buildingName,
            lat: value.lat,
            lng: value.lng,
            initials: value.initials,
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
