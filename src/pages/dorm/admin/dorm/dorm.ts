import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

/**
 * Generated class for the DormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dorm',
  templateUrl: 'dorm.html',
})
export class DormAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DormPage')
  }

}
