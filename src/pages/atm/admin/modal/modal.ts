import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'
import { Camera, CameraOptions } from '@ionic-native/camera'

declare var google

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class AtmAdminModalPage {

  @ViewChild("map") mapElement: ElementRef
  private map
  private itemsRef
  private params
  private key
  public img

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    private camera: Camera
  ) {
    this.itemsRef = this.afDatabase.list('atm')
    this.key = navParams.get('key')
    this.params = {
      placeName: '',
      ATMName: '',
      lat: '',
      lng: ''
    }
    this.img = ''
  }

  ionViewDidLoad() {
    this.loadMap()
  }

  loadMap() {
    let latLng = new google.maps.LatLng(16.245616, 103.250208)
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
    this.getPlaceProfiles()
    google.maps.event.addListener(this.map, "click", (event) => {
      this.params.lat = event.latLng.lat()
      this.params.lng = event.latLng.lng()
    })
  }

  getPlaceProfiles() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.key == data.key) {
          this.params.placeName = data.payload.val()['placeName']
          this.params.ATMName = data.payload.val()['ATMName']
          this.params.lat = data.payload.val()['lat']
          this.params.lng = data.payload.val()['lng']
        }
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
      this.img = 'data:image/jpeg;base64,' + imageData
    }, (err) => {
      console.log(err)
    })
  }
  
  upload() {
    console.log('upload')
  }

  onSubmit(myform) {
    let params = myform.value
    if (typeof this.key == 'undefined') {
      this.itemsRef.push(params)
    }
    else {
      this.itemsRef.update(
        this.key, {
          placeName: params.placeName,
          ATMName: params.ATMName,
          lat: params.lat,
          lng: params.lng
        }
      )
    }
    this.closeModal()
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
