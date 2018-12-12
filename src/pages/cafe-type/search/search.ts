import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { ToastController } from 'ionic-angular'

import { HomePage } from '../../home/home'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class CafeTypeSearchPage {

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
    this.itemsRef = this.afDatabase.list('cafeType')
    this.params = {
      CafeType: ''
    }
  }

  ionViewDidLoad() {
    this.getBuilding()
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
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
          CafeType: data.payload.val()['CafeType']
        })
      })
    })
    loading.dismiss()
    this.temp = this.items
  }

  onSubmit(myform) {
    var values = []
    this.items = []
    var val = myform.value.CafeType
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.CafeType.toLowerCase().indexOf(val.toLowerCase()) > -1)
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
        CafeType: value.CafeType
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
