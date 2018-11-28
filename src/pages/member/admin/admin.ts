import { Component } from '@angular/core'
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular'

import { AdminModalPage } from '../modal/modal'

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
  }

  create() {
    let profileModal = this.modalCtrl.create(AdminModalPage)
    profileModal.present()
  }

  load() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
  }

}
