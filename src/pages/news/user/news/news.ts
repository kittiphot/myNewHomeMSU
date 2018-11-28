import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { NewsUserModalPage } from '../modal/modal'
import { NewsUserSearchPage } from '../search/search'

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsUserPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.itemsRef = this.afDatabase.list('news')
    this.items = []
  }

  ionViewDidLoad() {
    this.getNews()
  }

  getNews() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.items.push({
          key: data.key,
          newsName: data.payload.val()['newsName']
        })
      })
      loading.dismiss()
    })
  }

  goToModal(key) {
    let profileModal = this.modalCtrl.create(NewsUserModalPage, {
      key: key
    })
    profileModal.present()
  }

  search() {
    let searchModal = this.modalCtrl.create(NewsUserSearchPage)
    searchModal.onDidDismiss(data => {
      data.forEach(value => {
        let params = {
          key: value.key,
          buildingName: value.buildingName,
          lat: value.lat,
          lng: value.lng,
          initials: value.initials,
          openClosed: value.openClosed
        }
      })
    })
    searchModal.present()
  }

}
