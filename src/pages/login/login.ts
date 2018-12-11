import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular'

import { Facebook } from '@ionic-native/facebook'
import { Storage } from '@ionic/storage'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import firebase from 'firebase'

import { HomePage } from '../home/home'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private member = {
    name: '',
    email: '',
    password: '',
    img: '',
    status: ''
  }
  private itemsRef
  private recentLogin
  private beforePage = {
    key: '',
    page: ''
  }
  private users: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private afauth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private fb: Facebook
  ) {
    this.itemsRef = this.afDatabase.list('member')
    this.beforePage.key = navParams.get('key')
    this.beforePage.page = navParams.get('page')
    this.storage.get('member').then((val) => {
      this.recentLogin = val
    })
    this.storage.get('loggedIn').then((val) => {
      if (val != null) {
        this.navCtrl.push(HomePage)
      }
    })
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false)
  }

  onSubmit(myform) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    var items = []
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(values => {
        items.push({
          key: values.key,
          email: values.payload.val()['email'],
          password: values.payload.val()['password'],
          status: values.payload.val()['status']
        })
      })
      var values = []
      var val = myform.value.email
      if (val && val.trim() != '') {
        values = items.filter(item => {
          return (item.email.toLowerCase() == val.toLowerCase())
        })
      }
      if (values.length != 0) {
        if (values['0'].password == myform.value.password) {
          this.storage.set('loggedIn', true)
          this.storage.set('email', values['0'].email)
          this.storage.set('member', values['0'].email)
          this.checkBeforePage()
        }
        else {
          this.presentToast('รหัสผ่านไม่ถูกต้อง')
        }
      }
      else {
        this.presentToast('Email ไม่ถูกต้อง')
      }
    })
    loading.dismiss()
  }

  // loginwithfb() {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   })
  //   loading.present()
  //   var items = []
  //   this.itemsRef.snapshotChanges().subscribe(data => {
  //     data.forEach(values => {
  //       items.push({
  //         key: values.key,
  //         email: values.payload.val()['email']
  //       })
  //     })
  //     var values = []
  //     var val = res.user.email
  //     if (val && val.trim() != '') {
  //       values = items.filter(item => {
  //         return (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1)
  //       })
  //       if (values.length == 0) {
  //         this.member.name = res.user.displayName
  //         this.member.email = res.user.email
  //         this.member.password = ' '
  //         this.member.img = res.user.photoURL
  //         this.member.status = '2'
  //         this.itemsRef.push(this.member)
  //       }
  //     }
  //   })
  //   this.storage.set('loggedIn', true)
  //   this.storage.set('email', res.user.email)
  //   this.storage.set('member', res.user.email)
  //   this.checkBeforePage()
  //   loading.dismiss()
  // }

  loginwithfb() {
    this.fb.login(['public_profile', 'email'])
      .then(res => {
        if (res.status === "connected") {
          this.getUserDetail(res.authResponse.userID)
          var items = []
          this.itemsRef.snapshotChanges().subscribe(data => {
            data.forEach(values => {
              items.push({
                key: values.key,
                email: values.payload.val()['email']
              })
            })
          })
          var values = []
          var val = this.users.email
          if (val && val.trim() != '') {
            values = items.filter(item => {
              return (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1)
            })
            if (values.length == 0) {
              this.member.name = this.users.name
              this.member.email = this.users.email
              this.member.password = ' '
              this.member.img = this.users.picture.data.url
              this.member.status = '2'
              this.itemsRef.push(this.member)
            }
          }
          this.storage.set('loggedIn', true)
          this.storage.set('email', this.users.email)
          this.storage.set('member', this.users.email)
          this.checkBeforePage()
        } else {
          this.storage.set('loggedIn', false)
        }
      })
      .catch(e => console.log('Error logging into Facebook', e))
  }

  getUserDetail(userid) {
    this.fb.api("/" + userid + "/?fields=id,email,name,picture.width(720).height(720).as(picture)", ["public_profile"])
      .then(res => {
        console.log(res)
        this.users = res
      })
      .catch(e => {
        console.log(e)
      })
  }

  loginRecentLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    var items = []
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(values => {
        items.push({
          key: values.key,
          email: values.payload.val()['email'],
          password: values.payload.val()['password'],
          status: values.payload.val()['status']
        })
      })
      var values = []
      var val = this.recentLogin
      if (val && val.trim() != '') {
        values = items.filter(item => {
          return (item.email.toLowerCase() == val.toLowerCase())
        })
      }
      if (values.length != 0) {
        this.storage.set('loggedIn', true)
        this.storage.set('email', values['0'].email)
        this.checkBeforePage()
      }
    })
    loading.dismiss()
  }

  checkBeforePage() {
    if (this.beforePage.page != undefined) {
      this.navCtrl.push(this.beforePage.page, {
        key: this.beforePage.key,
        before: 'LoginPage'
      })
    }
    else {
      this.navCtrl.push(HomePage)
    }
  }

  closeModal() {
    this.navCtrl.push(HomePage)
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
