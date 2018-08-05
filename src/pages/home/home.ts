import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  icon() {
    console.log("icon");
  }

  notifications() {
    console.log("notifications");
  }

  goToLoginPage() {
    console.log("login");
    this.navCtrl.push(LoginPage);
  }

}
