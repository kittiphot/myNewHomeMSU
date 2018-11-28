import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'

import { Storage } from '@ionic/storage'
import { AngularFireAuth } from 'angularfire2/auth'

import { LoginPage } from '../login/login'
import { NewsUserPage } from '../news/user/news/news'
import { NewsAdminPage } from '../news/admin/news/news'
import { MapPage } from '../map/map'
import { AtmAdminPage } from '../atm/admin/atm/atm'
import { BankAdminPage } from '../bank/admin/bank/bank'
import { BuildingAdminPage } from '../building/admin/building/building'
import { BusAdminPage } from '../bus/admin/bus/bus'
import { CafeAdminPage } from '../cafe/admin/cafe/cafe'
import { DormAdminPage } from '../dorm/admin/dorm/dorm'
import { ParkingAdminiPage } from '../parking/admin/parking/parking'
import { ToiletAdminPage } from '../toilet/admin/toilet/toilet'
import { MemberPage } from '../member/member'
import { PasswordPage } from '../member/password/password'

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
        this.navCtrl.push(NewsAdminPage)
      }
      if (nameMenu == 'building') {
        this.navCtrl.push(BuildingAdminPage)
      }
      if (nameMenu == 'bank') {
        this.navCtrl.push(BankAdminPage)
      }
      if (nameMenu == 'atm') {
        this.navCtrl.push(AtmAdminPage)
      }
      if (nameMenu == 'bus') {
        this.navCtrl.push(BusAdminPage)
      }
      if (nameMenu == 'dorm') {
        this.navCtrl.push(DormAdminPage)
      }
      if (nameMenu == 'parking') {
        this.navCtrl.push(ParkingAdminiPage)
      }
      if (nameMenu == 'cafe') {
        this.navCtrl.push(CafeAdminPage)
      }
      if (nameMenu == 'toilet') {
        this.navCtrl.push(ToiletAdminPage)
      }
      if (nameMenu == 'member') {
        this.navCtrl.push(MemberPage)
      }
    }
    else {
      if (nameMenu == 'news') {
        this.navCtrl.push(NewsUserPage)
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
      if (nameMenu == 'atm') {
        this.navCtrl.push(MapPage, {
          nameMenu: nameMenu
        })
      }
      if (nameMenu == 'bus') {
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
      if (nameMenu == 'cafe') {
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

  goToChangePasswordPage() {
    this.navCtrl.push(PasswordPage)
  }

}
