import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class BankAdminSearchPage {

  public params
  private items
  private itemsRef
  private temp
  private names

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('bank')
    this.params = {
      bankName: ''
    }
  }

  ionViewDidLoad() {
    this.getBank()
    this.getName()
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  getBank() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.items = []
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.items.push({
          key: data.key,
          bankName: data.payload.val()['bankName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng'],
          openClosed: data.payload.val()['openClosed'],
          status: data.payload.val()['status']
        })
      })
    })
    loading.dismiss()
    this.temp = this.items
  }

  getName() {
    this.names = []
    this.afDatabase.list('bankName').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.names.push({
          key: data.key,
          bankName: data.payload.val()['bankName']
        })
      })
    })
  }

  onSubmit(myform) {
    var values = []
    this.items = []
    var val = myform.value.bankName
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.bankName.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
      this.add(values)
    }
    if (this.items == '') {
      this.items = this.temp
      this.presentToast('ไม่พบข้อมูลในระบบ')
    }
    else {
      this.presentToast('ค้นหาสำเร็จ')
    }
    this.closeModal()
  }

  add(values) {
    values.forEach(value => {
      this.items.push({
        key: value.key,
        bankName: value.bankName,
        lat: value.lat,
        lng: value.lng,
        openClosed: value.openClosed,
        status: value.status
      })
    })
  }

  closeModal() {
    this.viewCtrl.dismiss(this.items)
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
