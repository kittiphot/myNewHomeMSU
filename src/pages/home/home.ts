import { Component } from '@angular/core'
import { NavController, LoadingController, ViewController } from 'ionic-angular'

import { Storage } from '@ionic/storage'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'

import { LoginPage } from '../login/login'
import { NewsUserPage } from '../news/user/news/news'
import { NewsAdminPage } from '../news/admin/news/news'
import { MapPage } from '../map/map'
import { AtmAdminPage } from '../atm/admin/atm/atm'
import { BankNamePage } from '../bank-name/bank-name/bank-name'
import { BankAdminPage } from '../bank/admin/bank/bank'
import { BuildingNamePage } from '../building-name/building-name/building-name'
import { BuildingAdminPage } from '../building/admin/building/building'
import { BusAdminPage } from '../bus/admin/bus/bus'
import { CafeTypePage } from '../cafe-type/cafe-type/cafe-type'
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
    email: '',
    status: ''
  }
  private itemsRef

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController
  ) {
    this.itemsRef = this.afDatabase.list('member')
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.storage.get('loggedIn').then((val) => {
      this.facebook.loggedIn = false
      if (val == true) {
        this.facebook.loggedIn = val
      }
      this.storage.get('email').then((val) => {
        this.facebook.email = ''
        if (val != '') {
          this.facebook.email = val
        }
        var items = []
        this.itemsRef.snapshotChanges().subscribe(data => {
          data.forEach(values => {
            items.push({
              key: values.key,
              email: values.payload.val()['email'],
              password: values.payload.val()['password'],
              img: values.payload.val()['img'],
              status: values.payload.val()['status']
            })
          })
          var values = []
          var val = this.facebook.email
          if (val && val.trim() != '') {
            values = items.filter(item => {
              return (item.email.toLowerCase() == val.toLowerCase())
            })
          }
          if (values.length != 0) {
            this.facebook.img = values['0'].img
            this.facebook.status = values['0'].status
          }
          loading.dismiss()
        })
      })
    })
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false)
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  logoutwithfb() {
    this.afauth.auth.signOut().then(res => {
      this.storage.set('loggedIn', null)
      this.storage.set('email', null)
      this.facebook.loggedIn = false
      this.facebook.img = ''
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
      if (nameMenu == 'buildingName') {
        this.navCtrl.push(BuildingNamePage)
      }
      if (nameMenu == 'bankName') {
        this.navCtrl.push(BankNamePage)
      }
      if (nameMenu == 'cafeType') {
        this.navCtrl.push(CafeTypePage)
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
