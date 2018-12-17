import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Storage } from '@ionic/storage'
import firebase from 'firebase'

import { LoginPage } from '../../../login/login'
import { MapPage } from '../../../map/map'
import { ToiletCommentPage } from '../../user/comment/comment/comment'
import { ToiletCommentModalPage } from '../../user/comment//modal/modal'
import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-toilet',
  templateUrl: 'toilet.html',
})
export class ToiletUserPage {

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
  private img

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
    this.itemsRef = this.afDatabase.list('toilet')
    this.key = navParams.get('key')
    this.storage.get('email').then((val) => {
      this.email = ''
      if (val != '') {
        this.email = val
      }
    })
    this.items = {
      buildingName: '',
      lat: '',
      lng: '',
      type: '',
      detail: ''
    }
    this.star1 = "dark"
    this.star2 = "dark"
    this.star3 = "dark"
    this.star4 = "dark"
    this.star5 = "dark"
    this.comment = ''
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.getImage()
    this.getToilet()
    this.getScores()
    this.getComments()
    loading.dismiss()
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false)
  }

  goToHomePage() {
    this.closeModal()
    this.navCtrl.push(HomePage)
  }

  getImage() {
    let storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`toilet/${this.key}.jpg`)
    imageRef.getDownloadURL().then(url => {
      this.img = url
    }).catch(function (error) {
    })
  }

  getToilet() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (data.key == this.key) {
          this.items.buildingName = data.payload.val()['buildingName']
          this.items.lat = data.payload.val()['lat']
          this.items.lng = data.payload.val()['lng']
          this.items.type = data.payload.val()['type']
          this.items.detail = data.payload.val()['detail']
        }
      })
    })
  }

  getScores() {
    this.afDatabase.list('score/toilet/' + this.key).snapshotChanges().subscribe(data => {
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
      this.average = (sum / this.scores.length).toFixed(2)
      if (this.average == 'NaN') {
        this.average = '0'
      }
    })
  }

  getComments() {
    this.afDatabase.list('comment/toilet/' + this.key).snapshotChanges().subscribe(data => {
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
        page: ToiletUserPage
      })
    }
    else {
      let Ref = this.afDatabase.list('score/toilet/' + this.key)
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
    let profileModal = this.modalCtrl.create(ToiletCommentPage, {
      key: this.key
    })
    profileModal.present()
  }

  update(key) {
    let profileModal = this.modalCtrl.create(ToiletCommentModalPage, {
      key: this.key,
      commentKey: key
    })
    profileModal.present()
  }

  delete(key) {
    this.afDatabase.list('comment/toilet/' + this.key).remove(key)
    this.presentToast('ลบสำเร็จ')
  }

  onSubmit(myform) {
    if (this.email == null) {
      this.navCtrl.push(LoginPage, {
        key: this.key,
        page: ToiletUserPage
      })
    }
    else {
      let Ref = this.afDatabase.list('comment/toilet/' + this.key)
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
    this.viewCtrl.dismiss('close')
    if (this.navParams.get('before') == 'LoginPage') {
      this.navCtrl.push(MapPage, {
        nameMenu: 'toilet'
      })
    }
  }

  navigate() {
    window.open("geo:" + this.items.lat + "," + this.items.lng + "?q=" + this.items.buildingName)
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
