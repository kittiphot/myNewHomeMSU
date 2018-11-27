import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

declare var google

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class CafeAdminModalPage {

  @ViewChild("map") mapElement: ElementRef
  private map
  private itemsRef
  private params
  private key

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController
  ) {
    this.itemsRef = this.afDatabase.list('cafe')
    this.key = navParams.get('key')
    this.params = {
      cafeName: '',
      lat: '',
      lng: '',
      price: '',
      openClosed: '',
      phoneNumber: '',
      contact: ''
    }
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
          this.params.cafeName = data.payload.val()['cafeName']
          this.params.lat = data.payload.val()['lat']
          this.params.lng = data.payload.val()['lng']
          this.params.price = data.payload.val()['price']
          this.params.openClosed = data.payload.val()['openClosed']
          this.params.phoneNumber = data.payload.val()['phoneNumber']
          this.params.contact = data.payload.val()['contact']
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
          cafeName: params.cafeName,
          lat: params.lat,
          lng: params.lng,
          price: params.price,
          openClosed: params.openClosed,
          phoneNumber: params.phoneNumber,
          contact: params.contact
        }
      )
    }
    this.closeModal()
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
