import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class NewsUserModalPage {

  private itemsRef
  private items
  private key

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController
  ) {
    this.itemsRef = this.afDatabase.list('news')
    this.key = navParams.get('key')
    this.items = {
      newsName: '',
      detail: ''
    }
  }

  ionViewDidLoad() {
    this.getNews()
  }
  
  goToHomePage() {
    this.closeModal()
    this.navCtrl.push(HomePage)
  }

  getNews() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.items.newsName = data.payload.val()['newsName']
          this.items.detail = data.payload.val()['detail']
        }
      })
      loading.dismiss()
    })
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
