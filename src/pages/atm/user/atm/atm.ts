import { Component } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'

@Component({
  selector: 'page-atm',
  templateUrl: 'atm.html',
})
export class AtmUserPage {

  public star1
  public star2
  public star3
  public star4
  public star5

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
    ) {
    this.star1 = "dark"
    this.star2 = "dark"
    this.star3 = "dark"
    this.star4 = "dark"
    this.star5 = "dark"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtmPage')
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
