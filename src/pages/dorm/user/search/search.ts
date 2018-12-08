import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class DormUserSearchPage {

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
    this.itemsRef = this.afDatabase.list('dorm')
    this.params = {
      dormName: '',
      type: ''
    }
  }

  ionViewDidLoad() {
    this.getDorm()
  }

  getDorm() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.items = []
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.items.push({
          key: data.key,
          dormName: data.payload.val()['dormName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng'],
          openClosed: data.payload.val()['openClosed'],
          dailyAirConditioner: data.payload.val()['dailyAirConditioner'],
          monthlyAirConditioner: data.payload.val()['monthlyAirConditioner'],
          termAirConditioner: data.payload.val()['termAirConditioner'],
          dailyFan: data.payload.val()['dailyFan'],
          monthlyFan: data.payload.val()['monthlyFan'],
          termFan: data.payload.val()['termFan'],
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

  onSubmit(myform) {
    var values = []
    this.items = []
    var val = myform.value.dormName
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.dormName.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
      this.add(values)
    }
    values = []
    var val = myform.value.type
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
        dormName: value.dormName,
        lat: value.lat,
        lng: value.lng,
        openClosed: value.openClosed,
        dailyAirConditioner: value.dailyAirConditioner,
        monthlyAirConditioner: value.monthlyAirConditioner,
        termAirConditioner: value.termAirConditioner,
        dailyFan: value.dailyFan,
        monthlyFan: value.monthlyFan,
        termFan: value.termFan,
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
