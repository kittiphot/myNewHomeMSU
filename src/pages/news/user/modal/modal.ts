import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

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
    this.getPlaceProfiles()
  }

  getPlaceProfiles() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (data.key == this.key) {
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
