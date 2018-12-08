import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class CafeAdminSearchPage {

  public params
  private items
  private itemsRef
  private temp
  private types

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('cafe')
    this.params = {
      cafeName: '',
      type: ''
    }
  }

  ionViewDidLoad() {
    this.getCafe()
    this.getType()
  }

  getCafe() {
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
          contact: data.payload.val()['contact'],
          type: data.payload.val()['type'],
          status: data.payload.val()['status']
        })
      })
    })
    loading.dismiss()
    this.temp = this.items
  }

  getType() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.types = []
    this.afDatabase.list('cafeType').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.types.push({
          key: data.key,
          CafeType: data.payload.val()['CafeType']
        })
      })
    })
    loading.dismiss()
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
    values = []
    val = myform.value.type
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.type.toLowerCase().indexOf(val.toLowerCase()) > -1)
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
        contact: value.contact,
        status: value.status
      })
    })
  }

  closeModal() {
    this.viewCtrl.dismiss(this.items)
    this.presentToast('ค้นหาสำเร็จ')
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    })
    toast.present()
  }

}
