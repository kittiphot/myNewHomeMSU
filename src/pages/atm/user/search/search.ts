import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class BuildingUserSearchPage {

  public params
  private items
  private itemsRef
  private temp

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController
  ) {
    this.itemsRef = this.afDatabase.list('atm')
    this.params = {
      ATMName: ''
    }
  }

  ionViewDidLoad() {
    this.getBuilding()
  }

  getBuilding() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.items = []
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.items.push({
          key: data.key,
          placeName: data.payload.val()['placeName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng'],
          ATMName: data.payload.val()['ATMName']
        })
      })
    })
    loading.dismiss()
    this.temp = this.items
  }

  onSubmit(myform) {
    var values = []
    this.items = []
    var val = myform.value.ATMName
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.ATMName.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
      this.add(values)
    }
    if (this.items == '') {
      this.items = this.temp
    }
    this.closeModal()
  }

  add(values) {
    values.forEach(value => {
      this.items.push({
        key: value.key,
        placeName: value.placeName,
        lat: value.lat,
        lng: value.lng,
        ATMName: value.ATMName
      })
    })
  }

  closeModal() {
    this.viewCtrl.dismiss(this.items)
  }

}
