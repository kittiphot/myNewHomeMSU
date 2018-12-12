import { Component, ViewChild } from '@angular/core'
import { NavController, NavParams, Tabs, ViewController } from 'ionic-angular'

import { AdminPage } from '../member/admin/admin'
import { AdminModalPage } from '../member/modal/modal'
import { UserPage } from '../member/user/user'
import { HomePage } from '../home/home'

@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {

  private page = 0
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = AdminPage
  tab2Root = UserPage

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false)
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  changePage() {
    this.page = this.tabRef.getSelected().index
  }

  create() {
    this.navCtrl.push(AdminModalPage)
  }

  closePage() {
    this.navCtrl.push(HomePage)
  }

}
