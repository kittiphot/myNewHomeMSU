import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsUserPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
  }

}
