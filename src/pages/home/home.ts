import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'

import { Storage } from '@ionic/storage'
import { AngularFireAuth } from 'angularfire2/auth'

import { LoginPage } from '../login/login'
import { NewsPage } from '../news/user/news/news'
import { MapPage } from '../map/map'
import { AtmAdminPage } from '../atm/admin/atm/atm'
import { BuildingAdminPage } from '../building/admin/building/building'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private facebook = {
    loggedIn: false,
    img: '',
    UID: '',
    status: ''
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
        this.storage.get('status').then((val) => {
          this.facebook.status = ''
          if (val != '') {
            this.facebook.status = val
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
    })
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  logoutwithfb() {
    this.afauth.auth.signOut().then(res => {
      this.storage.set('loggedIn', null)
      this.storage.set('UID', null)
      this.storage.set('status', null)
      this.facebook.loggedIn = false
      this.facebook.img = ''
      this.facebook.UID = ''
      this.facebook.status = ''
      this.navCtrl.setRoot(this.navCtrl.getActive().component)
    })
  }

  goToPage(nameMenu) {
    if (this.facebook.status == '1' || this.facebook.status == '0') {
      if (nameMenu == 'news') {
        console.log('News Admin')
      }
      if (nameMenu == 'building') {
        this.navCtrl.push(BuildingAdminPage)
      }
      if (nameMenu == 'bank') {
        console.log('Bank Admin')
      }
      if (nameMenu == 'ATM') {
        this.navCtrl.push(AtmAdminPage)
      }
      if (nameMenu == 'bus') {
        console.log('Bus Stop Admin')
      }
      if (nameMenu == 'dorm') {
        console.log('Dorm Admin')
      }
      if (nameMenu == 'parking') {
        console.log('Parking Admin')
      }
      if (nameMenu == 'restaurant') {
        console.log('Restaurant Admin')
      }
      if (nameMenu == 'toilet') {
        console.log('Toilet Admin')
      }
      if (nameMenu == 'member') {
        console.log('Member Admin')
      }
    }
    else {
      if (nameMenu == 'news') {
        this.navCtrl.push(NewsPage)
      }
      if (nameMenu == 'building') {
        this.navCtrl.push(MapPage, {
          nameMenu: nameMenu
        })
      }
      if (nameMenu == 'bank') {
        this.navCtrl.push(MapPage, {
          nameMenu: nameMenu
        })
      }
      if (nameMenu == 'ATM') {
        this.navCtrl.push(MapPage, {
          nameMenu: nameMenu
        })
      }
      if (nameMenu == 'busStop') {
        this.navCtrl.push(MapPage, {
          nameMenu: nameMenu
        })
      }
      if (nameMenu == 'dorm') {
        this.navCtrl.push(MapPage, {
          nameMenu: nameMenu
        })
      }
      if (nameMenu == 'parking') {
        this.navCtrl.push(MapPage, {
          nameMenu: nameMenu
        })
      }
      if (nameMenu == 'restaurant') {
        this.navCtrl.push(MapPage, {
          nameMenu: nameMenu
        })
      }
      if (nameMenu == 'toilet') {
        this.navCtrl.push(MapPage, {
          nameMenu: nameMenu
        })
      }
    }
  }

}
