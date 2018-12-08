import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { ToastController } from 'ionic-angular'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class BuildingAdminSearchPage {

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
    this.itemsRef = this.afDatabase.list('building')
    this.params = {
      buildingName: '',
      initials: ''
    }
  }

  ionViewDidLoad() {
    this.getBuilding()
    this.getName()
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
          buildingName: data.payload.val()['buildingName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng'],
          initials: data.payload.val()['initials'],
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
    var values = []
    this.items = []
    var val = myform.value.buildingName
    if (val && val.trim() != '') {
      values = this.temp.filter(item => {
        return (item.buildingName.toLowerCase().indexOf(val.toLowerCase()) > -1)
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
        buildingName: value.buildingName,
        lat: value.lat,
        lng: value.lng,
        initials: value.initials,
        openClosed: value.openClosed,
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
