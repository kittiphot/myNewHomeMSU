import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class ToiletUserSearchPage {

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
    this.itemsRef = this.afDatabase.list('toilet')
    this.params = {
      buildingName: ''
    }
  }

  ionViewDidLoad() {
    this.getToilet()
    this.getName()
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  getToilet() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.items = []
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.items.push({
          key: data.key,
          buildingName: data.payload.val()['buildingName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng'],
          type: data.payload.val()['type'],
          detail: data.payload.val()['detail'],
          status: data.payload.val()['status']
        })
      })
    })
    loading.dismiss()
    this.temp = this.items
  }

  getName() {
    this.names = []
    this.afDatabase.list('buildingName').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.names.push({
          key: data.key,
          buildingName: data.payload.val()['buildingName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng']
        })
      })
    })
  }

  onSubmit(myform) {
    this.items = []
    var values = []
    var val = myform.value.buildingName
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.buildingName.toLowerCase() == val.toLowerCase())
      })
      this.add(values)
    }
    values = []
    var val = myform.value.type
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.type.toLowerCase() == val.toLowerCase())
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
        buildingName: value.buildingName,
        lat: value.lat,
        lng: value.lng,
        type: value.type,
        detail: value.detail,
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
