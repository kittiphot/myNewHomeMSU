import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login'
import { NewsPage } from '../news/news'
import { MapPage } from '../map/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loggedIn = false

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private afauth: AngularFireAuth
  ) {
    this.storage.get('loggedIn').then((val) => {
      if (val == null || val == false) {
        this.loggedIn = false
      }
      else {
        this.loggedIn = val
      }
    });
    console.log(this.loggedIn)
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  logoutwithfb() {
    this.afauth.auth.signOut().then(res => {
      this.storage.set('loggedIn', 'false')
      this.loggedIn = false
    })
    // this.navCtrl.setRoot(this.navCtrl.getActive().component)
  }

  goToNewsPage() {
    this.navCtrl.push(NewsPage)
  }

  goToMapPage() {
    this.navCtrl.push(MapPage)
  }

}
