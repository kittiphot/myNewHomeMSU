import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  private items
  private itemsRef

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private afDatabase: AngularFireDatabase
  ) {
    this.itemsRef = this.afDatabase.list('member')
    this.items = []
    this.getMember()
  }

  getMember() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      this.items = []
      data.forEach(data => {
        if (data.payload.val()['status'] == 2) {
          if (data.payload.val()['name'] == '') {
            this.items.push({
              key: data.key,
              name: data.payload.val()['email'],
              status: data.payload.val()['status']
            })
          }
          else {
            this.items.push({
              key: data.key,
              name: data.payload.val()['name'],
              status: data.payload.val()['status']
            })
          }
        }
      })
      loading.dismiss()
    })
  }

  changeStatus(key) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.update(
      key, {
        status: '1'
      }
    )
    loading.dismiss()
  }

}
