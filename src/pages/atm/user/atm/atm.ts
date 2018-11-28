import { Component } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'

/**
 * Generated class for the AtmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-atm',
  templateUrl: 'atm.html',
})
export class AtmPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtmPage')
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
