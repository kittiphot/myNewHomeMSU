import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { HomePage } from '../home/home'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private facebook = {
    loggedIn: false,
    name: '',
    email: '',
    img: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private afauth: AngularFireAuth
    ) {
  }

  loginwithfb() {
    this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
      this.storage.set('loggedIn', 'true')
      this.facebook.name = res.user.displayName
      this.facebook.email = res.user.email
      this.facebook.img = res.user.photoURL
    })
    this.navCtrl.push(HomePage)
  }

}
