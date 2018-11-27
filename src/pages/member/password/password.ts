import { Component } from '@angular/core'
import { NavController, NavParams, ModalController } from 'ionic-angular'

import { HomePage } from '../../home/home'

@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage')
  }
  
  closePage() {
    this.navCtrl.push(HomePage)
  }

}
