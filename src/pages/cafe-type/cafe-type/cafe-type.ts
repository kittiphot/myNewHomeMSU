import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { CafeTypeModalPage } from '../modal/modal'
import { CafeTypeSearchPage } from '../search/search'

@Component({
  selector: 'page-cafe-type',
  templateUrl: 'cafe-type.html',
})
export class CafeTypePage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('cafeType')
    this.items = []
  }

  ionViewDidLoad() {
    this.getCafeType()
  }

  getCafeType() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      this.items = []
      data.forEach(data => {
        this.items.push({
          key: data.key,
          CafeType: data.payload.val()['CafeType']
        })
      })
      loading.dismiss()
    })
  }

  create() {
    let profileModal = this.modalCtrl.create(CafeTypeModalPage)
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(CafeTypeModalPage, {
      key: key
    })
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('buildingName/' + key + '/cafe').snapshotChanges().subscribe(data => {
      data.forEach(value => {
        this.afDatabase.list('cafe').remove(value.payload.val()['key'])
        this.afDatabase.list('score/cafe').remove(value.payload.val()['key'])
        this.afDatabase.list('comment/cafe').remove(value.payload.val()['key'])
      })
    })
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  search() {
    this.items = []
    let searchModal = this.modalCtrl.create(CafeTypeSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        this.items.push({
          key: value.key,
          CafeType: value.CafeType
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
