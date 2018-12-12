import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, LoadingController, ToastController, ModalController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../../../home/home'
import { BuildingAdminModalPage } from '../modal/modal'

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowBuildingPage {

  private key
  private items
  private comments
  private average

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {
    this.key = navParams.get('key')
    this.items = {
      key: '',
      buildingName: '',
      lat: '',
      lng: '',
      initials: '',
      openClosed: '',
      status: ''
    }
    this.getBuilding()
    this.getScores()
    this.getComments()
  }

  goToHomePage() {
    this.closeModal()
    this.navCtrl.push(HomePage)
  }

  getBuilding() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.afDatabase.list('building').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.items.key = data.key
          this.items.buildingName = data.payload.val()['buildingName']
          this.items.lat = data.payload.val()['lat']
          this.items.lng = data.payload.val()['lng']
          this.items.initials = data.payload.val()['initials']
          this.items.openClosed = data.payload.val()['openClosed']
          if (data.payload.val()['status'] == 1) {
            this.items.status = 'ใช้งาน'
          }
          else {
            this.items.status = 'ยกเลิกการใช้งาน'
          }
        }
      })
      loading.dismiss()
    })
  }

  getScores() {
    this.afDatabase.list('score/building/' + this.key).snapshotChanges().subscribe(data => {
      let count = 0
      let sum = 0
      this.average = 0
      data.forEach(data => {
        count++
        sum = sum + data.payload.val()['score']
      })
      this.average = (sum / count).toFixed(2)
      if (this.average == 'NaN') {
        this.average = '0'
      }
    })
  }

  getComments() {
    this.afDatabase.list('comment/building/' + this.key).snapshotChanges().subscribe(data => {
      this.comments = []
      data.forEach(data => {
        this.comments.push({
          key: data.key,
          eamil: data.payload.val()['eamil'],
          comment: data.payload.val()['comment']
        })
      })
    })
  }

  changeStatus(key, status) {
    if (status == 'ใช้งาน') {
      this.afDatabase.list('building').update(
        key, {
          status: '0'
        }
      )
    }
    else {
      this.afDatabase.list('building').update(
        key, {
          status: '1'
        }
      )
    }
    this.presentToast('เปลี่ยนสถานะสำเร็จ')
  }

  update(key) {
    let profileModal = this.modalCtrl.create(BuildingAdminModalPage, {
      key: key
    })
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('score/building').remove(key)
    this.afDatabase.list('comment/building').remove(key)
    this.afDatabase.list('building').remove(key)
    this.presentToast('ลบสำเร็จ')
    this.closeModal()
  }

  deleteComment(key) {
    this.afDatabase.list('comment/building/' + this.key).remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  navigate() {
    window.open("geo:" + this.items.lat + "," + this.items.lng + "?q=" + this.items.buildingName)
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
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
