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
  private scores
  private average = 0

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
    this.getScores()
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

  getScores() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.scores = []
    let sum = 0
    let count = 0
    this.afDatabase.list('score/building/' + this.key).snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.scores.push({
          key: data.key,
          eamil: data.payload.val()['eamil'],
          score: data.payload.val()['score']
        })
        count++
        sum = sum + data.payload.val()['score']
      })
      loading.dismiss()
      this.average = (sum / count).toFixed(2)
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
    else {
      let Ref = this.afDatabase.list('score/building/' + this.key)
      let params = {
        eamil: this.email,
        score: this.score
      }
      let base = {
        eamil: '',
        score: ''
      }
      let key = ''
      let check = false
      this.scores.forEach(value => {
        if (params.eamil == value.eamil) {
          key = value.key
          base.eamil = value.eamil
          base.score = value.score
          check = true
        }
      })
      if (check == false) {
        Ref.push(params)
      }
      else {
        Ref.update(
          key, {
            score: params.score
          }
        )
      }
    }
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
