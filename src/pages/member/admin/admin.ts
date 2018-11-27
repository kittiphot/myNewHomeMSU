import { Component } from '@angular/core'
import { NavController, NavParams, ModalController } from 'ionic-angular'

import { AdminModalPage } from '../modal/modal'

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController) {
  }

  create() {
    let profileModal = this.modalCtrl.create(AdminModalPage)
    profileModal.present()
  }

}
