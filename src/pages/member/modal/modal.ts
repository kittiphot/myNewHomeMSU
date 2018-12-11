import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

import { AngularFireDatabase } from 'angularfire2/database'
import { ToastController } from 'ionic-angular'

import { MemberPage } from '../member'

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class AdminModalPage {

  private itemsRef
  private member = {
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
    private toastCtrl: ToastController
  ) {
    this.itemsRef = this.afDatabase.list('member')
  }

  onSubmit(myform) {
    let params = {
      name: '',
      email: myform.value.email,
      password: myform.value.password,
      img: './assets/imgs/default.png',
      status: '1'
    }
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(myform.value.email)) {
      this.itemsRef.snapshotChanges().subscribe(data => {
        var items = []
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
        if (values.length == 0) {
          this.itemsRef.push(params)
          this.presentToast('เพิ่มผู้ดูแลระบบสำเร็จ')
          this.closeModal()
        }
        else {
          this.presentToast('Email มีในระบบแล้ว')
        }
      })
    }
  }

  closeModal() {
    this.navCtrl.push(MemberPage)
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
