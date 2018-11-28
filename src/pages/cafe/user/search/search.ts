import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class CafeUserSearchPage {

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
    this.itemsRef = this.afDatabase.list('cafe')
    this.params = {
      cafeName: ''
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
          cafeName: data.payload.val()['cafeName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng'],
          price: data.payload.val()['price'],
          openClosed: data.payload.val()['openClosed'],
          phoneNumber: data.payload.val()['phoneNumber'],
          contact: data.payload.val()['contact']
        })
      })
    })
    loading.dismiss()
    this.temp = this.items
  }

  onSubmit(myform) {
    var values = []
    this.items = []
    var val = myform.value.cafeName
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.cafeName.toLowerCase().indexOf(val.toLowerCase()) > -1)
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
        cafeName: value.cafeName,
        lat: value.lat,
        lng: value.lng,
        price: value.price,
        openClosed: value.openClosed,
        phoneNumber: value.phoneNumber,
        contact: value.contact
      })
    })
  }

  closeModal() {
    this.viewCtrl.dismiss(this.items)
  }

}
