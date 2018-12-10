import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Storage } from '@ionic/storage'

import { LoginPage } from '../../../login/login'
import { MapPage } from '../../../map/map'

@Component({
  selector: 'page-building',
  templateUrl: 'building.html',
})
export class BuildingUserPage {

  public star1
  public star2
  public star3
  public star4
  public star5
  private items
  private itemsRef
  private key
  private score = 0
  private email

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private storage: Storage
  ) {
    this.itemsRef = this.afDatabase.list('member')
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef = this.afDatabase.list('building')
    this.items = {
      buildingName: '',
      lat: '',
      lng: '',
      initials: '',
      openClosed: ''
    }
    this.key = navParams.get('key')
    this.storage.get('email').then((val) => {
      this.email = ''
      if (val != '') {
        this.email = val
        loading.dismiss()
      }
    })
    this.star1 = "dark"
    this.star2 = "dark"
    this.star3 = "dark"
    this.star4 = "dark"
    this.star5 = "dark"
    this.getBuilding()
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false)
  }

  getBuilding() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (data.key == this.key) {
          this.items.buildingName = data.payload.val()['buildingName']
          this.items.lat = data.payload.val()['lat']
          this.items.lng = data.payload.val()['lng']
          this.items.initials = data.payload.val()['initials']
          this.items.openClosed = data.payload.val()['openClosed']
        }
      })
      loading.dismiss()
    })
  }

  changeColor(point) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    if (point == 1) {
      this.star1 = "light"
      this.star2 = "dark"
      this.star3 = "dark"
      this.star4 = "dark"
      this.star5 = "dark"
      this.score = 1
    }
    if (point == 2) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "dark"
      this.star4 = "dark"
      this.star5 = "dark"
      this.score = 2
    }
    if (point == 3) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "dark"
      this.star5 = "dark"
      this.score = 3
    }
    if (point == 4) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "light"
      this.star5 = "dark"
      this.score = 4
    }
    if (point == 5) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "light"
      this.star5 = "light"
      this.score = 5
    }
    loading.dismiss()
  }

  saveScore() {
    if (this.email == null) {
      this.navCtrl.push(LoginPage, {
        key: this.key,
        page: BuildingUserPage
      })
    }
    let Ref = this.afDatabase.list('score/building')
    let params = {
      eamil: this.email,
      score: this.score
    }
    console.log(params)
    // Ref.push(params)
  }

  closeModal() {
    if (this.navParams.get('before') == 'LoginPage') {
      this.navCtrl.push(MapPage, {
        nameMenu: 'building'
      })
    }
    this.viewCtrl.dismiss('close')
  }

  navigate() {
    window.open("geo:" + this.items.lat + "," + this.items.lng + "?q=" + this.items.buildingName)
  }

}
