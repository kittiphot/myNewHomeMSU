import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Storage } from '@ionic/storage'

import { LoginPage } from '../../../login/login'
import { MapPage } from '../../../map/map'
import { DormCommentPage } from '../../user/comment/comment/comment'
import { DormCommentModalPage } from '../../user/comment//modal/modal'

@Component({
  selector: 'page-dorm',
  templateUrl: 'dorm.html',
})
export class DormUserPage {

  public star1
  public star2
  public star3
  public star4
  public star5
  private items
  private itemsRef
  private key
  private email
  private score = 0
  private scores
  private comment
  private comments
  private average

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private storage: Storage,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('member')
    this.itemsRef = this.afDatabase.list('dorm')
    this.items = {
      dormName: '',
      lat: '',
      lng: '',
      openClosed: '',
      dailyAirConditioner: '',
      monthlyAirConditioner: '',
      termAirConditioner: '',
      dailyFan: '',
      monthlyFan: '',
      termFan: '',
      phoneNumber: '',
      contact: '',
      type: ''
    }
    this.key = navParams.get('key')
    this.storage.get('email').then((val) => {
      this.email = ''
      if (val != '') {
        this.email = val
      }
    })
    this.star1 = "dark"
    this.star2 = "dark"
    this.star3 = "dark"
    this.star4 = "dark"
    this.star5 = "dark"
    this.comment = ''
    this.getDorm()
    this.getScores()
    this.getComments()
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false)
  }

  getDorm() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (data.key == this.key) {
          this.items.dormName = data.payload.val()['dormName']
          this.items.lat = data.payload.val()['lat']
          this.items.lng = data.payload.val()['lng']
          this.items.openClosed = data.payload.val()['openClosed']
          this.items.dailyAirConditioner = data.payload.val()['dailyAirConditioner']
          this.items.monthlyAirConditioner = data.payload.val()['monthlyAirConditioner']
          this.items.termAirConditioner = data.payload.val()['termAirConditioner']
          this.items.dailyFan = data.payload.val()['dailyFan']
          this.items.monthlyFan = data.payload.val()['monthlyFan']
          this.items.termFan = data.payload.val()['termFan']
          this.items.phoneNumber = data.payload.val()['phoneNumber']
          this.items.contact = data.payload.val()['contact']
          this.items.type = data.payload.val()['type']
        }
      })
      loading.dismiss()
    })
  }

  getScores() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.afDatabase.list('score/dorm/' + this.key).snapshotChanges().subscribe(data => {
      this.scores = []
      let sum = 0
      this.average = 0
      data.forEach(data => {
        this.scores.push({
          key: data.key,
          eamil: data.payload.val()['eamil'],
          score: data.payload.val()['score']
        })
        sum = sum + data.payload.val()['score']
      })
      loading.dismiss()
      this.average = (sum / this.scores.length).toFixed(2)
      if (this.average == 'NaN') {
        this.average = '0'
      }
    })
  }

  getComments() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.afDatabase.list('comment/dorm/' + this.key).snapshotChanges().subscribe(data => {
      this.comments = []
      let temp = []
      data.forEach(data => {
        temp.push({
          key: data.key,
          eamil: data.payload.val()['eamil'],
          comment: data.payload.val()['comment']
        })
      })
      if (temp.length > 5) {
        for (let index = temp.length - 5; index < temp.length; index++) {
          this.comments.push(temp[index])
        }
      }
      else {
        for (let index = 0; index < temp.length; index++) {
          this.comments.push(temp[index])
        }
      }
      loading.dismiss()
    })
  }

  changeColor(point) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    if (point == 1) {
      this.star1 = "light"
      this.star2 = "dark"
      this.star3 = "dark"
      this.star4 = "dark"
      this.star5 = "dark"
      this.score = 1
    }
    if (point == 2) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "dark"
      this.star4 = "dark"
      this.star5 = "dark"
      this.score = 2
    }
    if (point == 3) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "dark"
      this.star5 = "dark"
      this.score = 3
    }
    if (point == 4) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "light"
      this.star5 = "dark"
      this.score = 4
    }
    if (point == 5) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "light"
      this.star5 = "light"
      this.score = 5
    }
    loading.dismiss()
  }

  saveScore() {
    if (this.email == null) {
      this.navCtrl.push(LoginPage, {
        key: this.key,
        page: DormUserPage
      })
    }
    else {
      let Ref = this.afDatabase.list('score/dorm/' + this.key)
      let params = {
        eamil: this.email,
        score: this.score
      }
      let base = {
        eamil: '',
        score: ''
      }
      let key = ''
      let check = false
      this.scores.forEach(value => {
        if (params.eamil == value.eamil) {
          key = value.key
          base.eamil = value.eamil
          base.score = value.score
          check = true
        }
      })
      if (check == false) {
        Ref.push(params)
      }
      else {
        Ref.update(
          key, {
            score: params.score
          }
        )
      }
      this.presentToast('บันทึกสำเร็จ')
    }
  }

  goToCommentPage() {
    let profileModal = this.modalCtrl.create(DormCommentPage, {
      key: this.key
    })
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(DormCommentModalPage, {
      key: this.key,
      commentKey: key
    })
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('comment/dorm/' + this.key).remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  onSubmit(myform) {
    if (this.email == null) {
      this.navCtrl.push(LoginPage, {
        key: this.key,
        page: DormUserPage
      })
    }
    else {
      let Ref = this.afDatabase.list('comment/dorm/' + this.key)
      let params = {
        eamil: this.email,
        comment: myform.value.comment
      }
      Ref.push(params)
      this.presentToast('บันทึกสำเร็จ')
    }
    this.comment = ''
  }

  closeModal() {
    if (this.navParams.get('before') == 'LoginPage') {
      this.navCtrl.push(MapPage, {
        nameMenu: 'dorm'
      })
    }
    this.viewCtrl.dismiss('close')
  }

  navigate() {
    window.open("geo:" + this.items.lat + "," + this.items.lng + "?q=" + this.items.dormName)
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
