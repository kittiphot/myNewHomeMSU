import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../../../../home/home'

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class BuildingCommentModalPage {

  private itemsRef
  private key
  private commentKey
  private comment

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController
  ) {
    this.key = navParams.get('key')
    this.commentKey = navParams.get('commentKey')
    this.itemsRef = this.afDatabase.list('comment/building/' + this.key)
    this.comment = ''
  }

  ionViewDidLoad() {
    this.getComments()
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false)
  }
  
  goToHomePage() {
    this.closeModal()
    this.navCtrl.push(HomePage)
  }

  getComments() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(value => {
        if (this.commentKey == value.key) {
          this.comment = value.payload.val()['comment']
        }
      })
    })
  }

  onSubmit(myform) {
    this.itemsRef.update(
      this.commentKey, {
        comment: myform.value.comment
      }
    )
    this.presentToast('แก้ไขสำเร็จ')
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
