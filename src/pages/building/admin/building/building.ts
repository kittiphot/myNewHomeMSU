import { Component } from '@angular/core'
import { NavController, LoadingController, ModalController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { BuildingAdminModalPage } from '../modal/modal'

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
    private modalCtrl: ModalController
  ) {
    this.itemsRef = this.afDatabase.list('building')
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
          buildingName: data.payload.val()['buildingName']
        })
      });
      loading.dismiss()
    });
  }

  create() {
    let profileModal = this.modalCtrl.create(BuildingAdminModalPage);
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(BuildingAdminModalPage, {
      key: key
    });
    profileModal.present()
  }

  delete(key) {
    this.itemsRef.remove(key);
  }

}
