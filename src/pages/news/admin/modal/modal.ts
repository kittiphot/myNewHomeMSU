import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { ToastController } from 'ionic-angular'

import { HomePage } from '../../../home/home'

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class NewsAdminModalPage {

  private itemsRef
  private items
  private key

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
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

  onSubmit(myform) {
    let params = {
      newsName: myform.value.newsName,
      detail: myform.value.detail,
      status: '1'
    }
    if (typeof this.key == 'undefined') {
      this.itemsRef.push(params)
      this.presentToast('บันทึกสำเร็จ')
    }
    else {
      this.itemsRef.update(
        this.key, {
          newsName: params.newsName,
          detail: params.detail
        }
      )
      this.presentToast('แก้ไขสำเร็จ')
    }
    this.closeModal()
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
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
