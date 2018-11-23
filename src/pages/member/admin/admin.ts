import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

// import { AdminModalPage } from '../admin-modal/admin-modal'

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  // create() {
  //   let profileModal = this.modalCtrl.create(AdminModalPage);
  //   profileModal.present()
  // }

}
