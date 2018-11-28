import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class BusUserSearchPage {

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
    this.itemsRef = this.afDatabase.list('bus')
    this.params = {
      nameBus: ''
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
          nameBus: data.payload.val()['nameBus'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng'],
          detail: data.payload.val()['detail']
        })
      })
    })
    loading.dismiss()
    this.temp = this.items
  }

  onSubmit(myform) {
    var values = []
    this.items = []
    var val = myform.value.nameBus
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.nameBus.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
      this.add(values)
    }
    values = []
    val = myform.value.initials
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.initials.toLowerCase().indexOf(val.toLowerCase()) > -1)
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
        nameBus: value.nameBus,
        lat: value.lat,
        lng: value.lng,
        detail: value.detail
      })
    })
  }

  closeModal() {
    this.viewCtrl.dismiss(this.items)
  }

}
