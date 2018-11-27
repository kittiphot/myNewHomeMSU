import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { NewsAdminModalPage } from '../modal/modal'

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsAdminPage {

  items: any
  itemsRef: any

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase, //ต่อดาต้าเบส
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.items = []
    this.itemsRef = this.afDatabase.list('news')
  }

  ionViewDidLoad() {
    this.getPlaceProfiles()
  }

  getPlaceProfiles() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      this.items = []
      data.forEach(data => {
        this.items.push({
          key: data.key,
          newsName: data.payload.val()['newsName']
        })
      })
      loading.dismiss()
    })
  }

  create() {
    let profileModal = this.modalCtrl.create(NewsAdminModalPage)
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(NewsAdminModalPage, {
      key: key
    })
    profileModal.present()
  }

  delete(key) {
    this.itemsRef.remove(key)
  }

  search(){
    console.log('search')
  }

}
