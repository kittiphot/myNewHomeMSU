import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { BuildingNameModalPage } from '../modal/modal'
import { BuildingNameSearchPage } from '../search/search'

@Component({
  selector: 'page-building-name',
  templateUrl: 'building-name.html',
})
export class BuildingNamePage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('buildingName')
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
        this.items.push({
          key: data.key,
          buildingName: data.payload.val()['buildingName']
        })
      })
      loading.dismiss()
    })
  }

  create() {
    let profileModal = this.modalCtrl.create(BuildingNameModalPage)
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(BuildingNameModalPage, {
      key: key
    })
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('buildingName/' + key + '/building').snapshotChanges().subscribe(data => {
      data.forEach(value => {
        this.afDatabase.list('building').remove(value.payload.val()['key'])
        this.afDatabase.list('score/building').remove(value.payload.val()['key'])
        this.afDatabase.list('comment/building').remove(value.payload.val()['key'])
      })
    })
    this.afDatabase.list('buildingName/' + key + '/toilet').snapshotChanges().subscribe(data => {
      data.forEach(value => {
        this.afDatabase.list('toilet').remove(value.payload.val()['key'])
        this.afDatabase.list('score/toilet').remove(value.payload.val()['key'])
        this.afDatabase.list('comment/toilet').remove(value.payload.val()['key'])
      })
    })
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  search() {
    this.items = []
    let searchModal = this.modalCtrl.create(BuildingNameSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        this.items.push({
          key: value.key,
          buildingName: value.buildingName,
          lat: value.lat,
          lng: value.lng
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

}
