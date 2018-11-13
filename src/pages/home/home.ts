import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

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

  private facebook = {
    loggedIn: false,
    name: '',
    email: '',
    img: '',
    UID: ''
  }

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController
  ) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.storage.get('loggedIn').then((val) => {
      this.facebook.loggedIn = false
      if (val == true) {
        this.facebook.loggedIn = val
      }
      this.storage.get('UID').then((val) => {
        this.facebook.UID = ''
        if (val != '') {
          this.facebook.UID = val
        }
        this.afauth.authState.subscribe(res => {
          if (res != null) {
            if (res.uid == this.facebook.UID) {
              this.facebook.img = res.photoURL
            }
          }
          loading.dismiss()
        })
      })
    })
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  logoutwithfb() {
    this.afauth.auth.signOut().then(res => {
      this.storage.set('loggedIn', 'false')
      this.facebook.loggedIn = false
    })
    // this.navCtrl.setRoot(this.navCtrl.getActive().component)
  }

  goToPage(nameMenu) {
    if (nameMenu == 'news') {
      this.navCtrl.push(NewsPage)
    }
    if (nameMenu == 'building') {
      this.navCtrl.push(MapPage, {
        nameMenu : nameMenu
      })
    }
    if (nameMenu == 'bank') {
      this.navCtrl.push(MapPage, {
        nameMenu : nameMenu
      })
    }
    if (nameMenu == 'ATM') {
      this.navCtrl.push(MapPage, {
        nameMenu : nameMenu
      })
    }
    if (nameMenu == 'busStop') {
      this.navCtrl.push(MapPage, {
        nameMenu : nameMenu
      })
    }
    if (nameMenu == 'dorm') {
      this.navCtrl.push(MapPage, {
        nameMenu : nameMenu
      })
    }
    if (nameMenu == 'parking') {
      this.navCtrl.push(MapPage, {
        nameMenu : nameMenu
      })
    }
    if (nameMenu == 'restaurant') {
      this.navCtrl.push(MapPage, {
        nameMenu : nameMenu
      })
    }
    if (nameMenu == 'toilet') {
      this.navCtrl.push(MapPage, {
        nameMenu : nameMenu
      })
    }
  }

}
