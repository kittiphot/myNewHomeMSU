import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'

import { Storage } from '@ionic/storage'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../../home/home'

@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  private itemsRef
  private member = {
    key: '',
    email: '',
    password: '',
    checkPassword: ''
  }

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private afDatabase: AngularFireDatabase
  ) {
    this.itemsRef = this.afDatabase.list('member')
    this.storage.get('email').then((val) => {
      this.member.email = val
    })
  }

  onSubmit(myform) {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.member.email == data.payload.val()['email']) {
          this.member.key = data.key
          this.member.password = data.payload.val()['password']
        }
      })
      if (myform.value.password == myform.value.checkPassword) {
        this.itemsRef.update(
          this.member.key, {
            password: myform.value.password
          }
        )
      }
    })
    this.closePage()
  }

  closePage() {
    this.navCtrl.push(HomePage)
  }

}
