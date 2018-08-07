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
    console.log("login");
    this.navCtrl.push(LoginPage);
  }

  goToNewsPage() {
    console.log("news");
    this.navCtrl.push(NewsPage);
  }

  goToMapPage() {
    console.log("map");
    this.navCtrl.push(MapPage);
  }

}
