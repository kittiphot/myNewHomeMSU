import { Component } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class AdminModalPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
