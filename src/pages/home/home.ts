import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login'
import { NewsPage } from '../news/news'
import { MapPage } from '../map/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  goToNewsPage() {
    this.navCtrl.push(NewsPage);
  }

  goToMapPage() {
    this.navCtrl.push(MapPage);
  }

}
