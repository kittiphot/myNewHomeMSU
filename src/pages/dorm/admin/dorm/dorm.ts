import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { DormAdminModalPage } from '../modal/modal'

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
    private modalCtrl: ModalController
  ) {
    this.itemsRef = this.afDatabase.list('dorm')
    this.items = []
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
          dormName: data.payload.val()['dormName']
        })
      })
      loading.dismiss()
    })
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
    this.itemsRef.remove(key);
  }

  search(){
    console.log('search')
  }

}
