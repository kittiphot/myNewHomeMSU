import { Component } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'

import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class AdminModalPage {

  private itemsRef
  private member = {
    UID: '',
    name: '',
    email: '',
    password: '',
    img: '',
    status: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController
  ) {
    this.itemsRef = this.afDatabase.list('member')
  }

  onSubmit(myform) {
    let params = {
      UID: '',
      name: '',
      email: myform.value.email,
      password: myform.value.password,
      img: './assets/imgs/default.png',
      status: '1'
    }
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(myform.value.email)) {
      this.itemsRef.push(params)
    }
    this.closeModal()
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
