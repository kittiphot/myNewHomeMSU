import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class ParkingAdminSearchPage {

  public params
  private items
  private itemsRef
  private temp

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController 
  ) {
    this.itemsRef = this.afDatabase.list('parking')
    this.params = {
      type: ''
    }
  }

  ionViewDidLoad() {
    this.getParking()
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  getParking() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.items = []
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.items.push({
          key: data.key,
          parkingName: data.payload.val()['parkingName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng'],
          type: data.payload.val()['type'],
          status: data.payload.val()['status']
        })
      })
    })
    loading.dismiss()
    this.temp = this.items
  }

  onSubmit(myform) {
    var values = []
    this.items = []
    var val = myform.value.type
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.type.toLowerCase().indexOf(val.toLowerCase()) > -1)
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
        parkingName: value.parkingName,
        lat: value.lat,
        lng: value.lng,
        type: value.type,
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
