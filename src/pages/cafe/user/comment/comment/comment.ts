import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ViewController, ModalController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Storage } from '@ionic/storage'

import { CafeCommentModalPage } from '../modal/modal'
import { HomePage } from '../../../../home/home'

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CafeCommentPage {

  private itemsRef
  private key
  private email
  private comments

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.key = navParams.get('key')
    this.itemsRef = this.afDatabase.list('comment/cafe/' + this.key)
    this.storage.get('email').then((val) => {
      this.email = ''
      if (val != '') {
        this.email = val
      }
    })
    this.getComments()
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false)
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  getComments() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    this.itemsRef.snapshotChanges().subscribe(data => {
      this.comments = []
      data.forEach(data => {
        this.comments.push({
          key: data.key,
          eamil: data.payload.val()['eamil'],
          comment: data.payload.val()['comment']
        })
      })
      loading.dismiss()
    })
  }

  update(key) {
    let profileModal = this.modalCtrl.create(CafeCommentModalPage, {
      key: this.key,
      commentKey: key
    })
    profileModal.present()
  }

  delete(key) {
    this.itemsRef.remove(key)
    this.presentToast('ลบสำเร็จ')
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
