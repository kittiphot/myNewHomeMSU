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
    status: ''
  }
  itemsRef

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private afauth: AngularFireAuth,
    private afDatabase: AngularFireDatabase
  ) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // })
    // loading.present()
    // this.afauth.authState.subscribe(res => {
    // loading.dismiss()
    // })
    this.itemsRef = this.afDatabase.list('member')
  }

  loginwithfb() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
      this.storage.set('loggedIn', true)
      this.storage.set('UID', res.user.uid)
      this.storage.set('status', "1")
      this.member.UID = res.user.uid
      this.member.status = '1'
      // this.itemsRef.snapshotChanges().subscribe(data => {
      //   data.forEach(values => {
      //     console.log(values.payload.val()['UID'])
      //     console.log(values.payload.val()['status'])
      //   })
      // })
      // if (typeof this.id == 'undefined') {
      // this.itemsRef.push(this.member)
      // }
      // else {
      //   this.itemsRef.update(
      //     this.id, {
      //       UID: member.UID,
      //       status: member.status
      //     }
      //   )
      // }
      this.navCtrl.push(HomePage)
      if (res == '') {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }
      loading.dismiss()
    })
  }

}
