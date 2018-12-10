import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-building',
  templateUrl: 'building.html',
})
export class BuildingUserPage {

  public params
  public star1
  public star2
  public star3
  public star4
  public star5
  private items
  private itemsRef
  private key

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController
  ) {
    this.itemsRef = this.afDatabase.list('building')
    this.items = {
      buildingName: '',
      lat: '',
      lng: '',
      initials: '',
      openClosed: ''
    }
    this.key = navParams.get('key')
    this.params = {
      buildingName: 'คณะวิทยาการสารสนเทศ',
      lat: '16.24658423965131',
      lng: '103.25198898678582',
      initials: '',
      openClosed: ''
    }
    this.star1 = "dark"
    this.star2 = "dark"
    this.star3 = "dark" 
    this.star4 = "dark"
    this.star5 = "dark"
    this.getBuilding()
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
    }
    if (point == 2) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "dark"
      this.star4 = "dark"
      this.star5 = "dark"
    }
    if (point == 3) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "dark"
      this.star5 = "dark"
    }
    if (point == 4) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "light"
      this.star5 = "dark"
    }
    if (point == 5) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "light"
      this.star5 = "light"
    }
    loading.dismiss()
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

  navigate() {
    window.open("geo:" + this.items.lat + "," + this.items.lng + "?q=" + this.items.buildingName)
  }

}
