import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular'

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
    UID: '',
    name: '',
    email: '',
    password: '',
    img: '',
    status: ''
  }
  private itemsRef
  private recentLogin

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private afauth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('member')
    this.storage.get('member').then((val) => {
      this.recentLogin = val
    })
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
          UID: values.payload.val()['UID'],
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
          this.navCtrl.push(HomePage)
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

  loginwithfb() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
      var items = []
      this.itemsRef.snapshotChanges().subscribe(data => {
        data.forEach(values => {
          items.push({
            key: values.key,
            UID: values.payload.val()['UID'],
            status: values.payload.val()['status']
          })
        })
        var values = []
        var val = res.user.uid
        if (val && val.trim() != '') {
          values = items.filter(item => {
            return (item.UID.toLowerCase().indexOf(val.toLowerCase()) > -1)
          })
          if (values.length == 0) {
            this.member.UID = res.user.uid
            this.member.name = res.user.displayName
            this.member.email = res.user.email
            this.member.password = ' '
            this.member.img = res.user.photoURL
            this.member.status = '2'
            this.itemsRef.push(this.member)
          }
        }
      })
      this.storage.set('loggedIn', true)
      this.storage.set('email', res.user.email)
      this.storage.set('member', res.user.email)
      this.navCtrl.push(HomePage)
      loading.dismiss()
    }, (err) => {
      console.log(err)
      loading.dismiss()
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
          UID: values.payload.val()['UID'],
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
        this.navCtrl.push(HomePage)
      }
    })
    loading.dismiss()
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
