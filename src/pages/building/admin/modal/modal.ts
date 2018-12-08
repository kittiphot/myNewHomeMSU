import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Camera, CameraOptions } from '@ionic-native/camera'

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class BuildingAdminModalPage {

  private itemsRef
  private params
  private key
  private names

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private camera: Camera
  ) {
    this.itemsRef = this.afDatabase.list('building')
    this.key = navParams.get('key')
    this.params = {
      buildingName: '',
      lat: '',
      lng: '',
      initials: '',
      img: '',
      openClosed: ''
    }
  }

  ionViewDidLoad() {
    this.getPlaceProfiles()
    this.getName()
  }

  getPlaceProfiles() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.params.buildingName = data.payload.val()['buildingName']
          this.params.lat = data.payload.val()['lat']
          this.params.lng = data.payload.val()['lng']
          this.params.initials = data.payload.val()['initials']
          this.params.openClosed = data.payload.val()['openClosed']
        }
      })
    })
  }

  getName() {
    this.names = []
    this.afDatabase.list('buildingName').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        this.names.push({
          key: data.key,
          buildingName: data.payload.val()['buildingName'],
          lat: data.payload.val()['lat'],
          lng: data.payload.val()['lng']
        })
      })
    })
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((imageData) => {
      this.params.img = 'data:image/jpeg;base64,' + imageData
    }, (err) => {
      console.log(err)
    })
  }

  onSubmit(myform) {
    let params = {
      nameKey: '',
      buildingName: myform.value.buildingName,
      lat: myform.value.lat,
      lng: myform.value.lng,
      initials: myform.value.initials,
      openClosed: '',
      status: '1'
    }
    this.names.forEach(data => {
      if (params.buildingName == data.buildingName) {
        params.nameKey = data.key
        params.lat = data.lat
        params.lng = data.lng
      }
    })
    var re = /^[0-9]{2}.[0-9]{2} - [0-9]{2}.[0-9]{2} น.$/;
    if (re.test(myform.value.openClosed)) {
      params.openClosed = myform.value.openClosed
    }
    var re = /^[0-9]{2} ชม.$/;
    if (re.test(myform.value.openClosed)) {
      params.openClosed = myform.value.openClosed
    }
    if (params.openClosed != '') {
      if (typeof this.key == 'undefined') {
        this.itemsRef.push(params)
        this.presentToast('บันทึกสำเร็จ')
      }
      else {
        this.itemsRef.update(
          this.key, {
            nameKey: params.nameKey,
            buildingName: params.buildingName,
            lat: params.lat,
            lng: params.lng,
            initials: params.initials,
            openClosed: params.openClosed
          }
        )
        this.presentToast('แก้ไขสำเร็จ')
      }
      this.closeModal()
    }
    else {
      this.presentToast('รูปแบบเวลาเปิด – ปิดอาคารไม่ถูกต้อง')
    }
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
