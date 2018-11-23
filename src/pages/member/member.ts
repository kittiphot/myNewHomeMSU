import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import { AdminPage } from '../admin/admin';
// import { UserPage } from '../user/user';

@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {
  
  // tab1Root = AdminPage;
  // tab2Root = UserPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }

}
