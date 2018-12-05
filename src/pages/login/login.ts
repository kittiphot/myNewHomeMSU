import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

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
    email: '',
    password: '',
    img: '',
    status: ''
  }
  private itemsRef

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private afauth: AngularFireAuth,
    private afDatabase: AngularFireDatabase
  ) {
    this.itemsRef = this.afDatabase.list('member')
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
          this.storage.set('UID', values['0'].UID)
          this.navCtrl.push(HomePage)
        }
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
            this.member.email = res.user.email
            this.member.password = ' '
            this.member.img = res.user.photoURL
            this.member.status = '2'
            this.itemsRef.push(this.member)
          }
        }
      })
      this.storage.set('loggedIn', true)
      this.storage.set('UID', res.user.uid)
      this.navCtrl.push(HomePage)
      loading.dismiss()
    }, (err) => {
      console.log(err)
      loading.dismiss()
    })
  }

}
