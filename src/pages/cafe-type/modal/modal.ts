import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Camera, CameraOptions } from '@ionic-native/camera'

import { HomePage } from '../../home/home'

declare var google

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class CafeTypeModalPage {

  @ViewChild("map") mapElement: ElementRef
  private map
  private itemsRef
  private params
  private key

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private camera: Camera
  ) {
    this.itemsRef = this.afDatabase.list('cafeType')
    this.key = navParams.get('key')
    this.params = {
      CafeType: ''
    }
  }

  ionViewDidLoad() {
    this.getPlaceProfiles()
  }
  
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  getPlaceProfiles() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.params.CafeType = data.payload.val()['CafeType']
        }
      })
    })
  }

  onSubmit(myform) {
    let params = {
      CafeType: myform.value.CafeType
    }
    if (typeof this.key == 'undefined') {
      this.itemsRef.push(params)
      this.presentToast('บันทึกสำเร็จ')
    }
    else {
      this.itemsRef.update(
        this.key, {
          CafeType: params.CafeType
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
