import { Component } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class NewsAdminModalPage {
  private itemsRef
  private params
  private key

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController
  ) {
    this.itemsRef = this.afDatabase.list('news')
    this.key = navParams.get('key')
    this.params = {
      newsName: '',
      detail: ''
    }
  }

  ionViewDidLoad() {
    this.getPlaceProfiles()
  }

  getPlaceProfiles() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.params.newsName = data.payload.val()['newsName']
          this.params.detail = data.payload.val()['detail']
        }
      })
    })
  }

  onSubmit(myform) {
    let params = myform.value
    if (typeof this.key == 'undefined') {
      this.itemsRef.push(params)
    }
    else {
      this.itemsRef.update(
        this.key, {
          newsName: params.newsName,
          detail: params.detail
        }
      )
    }
    this.closeModal()
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
