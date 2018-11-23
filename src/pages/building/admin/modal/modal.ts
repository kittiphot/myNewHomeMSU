import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

declare var google

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class BuildingAdminModalPage {

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
    this.itemsRef = this.afDatabase.list('building')
    this.key = navParams.get('key')
    this.params = {
      buildingName: '',
      lat: '',
      lng: '',
      initials: '',
      openClosed: ''
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
          this.params.buildingName = data.payload.val()['buildingName']
          this.params.lat = data.payload.val()['lat']
          this.params.lng = data.payload.val()['lng']
          this.params.initials = data.payload.val()['initials']
          this.params.openClosed = data.payload.val()['openClosed']
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
          buildingName: params.buildingName,
          lat: params.lat,
          lng: params.lng,
          initials: params.initials,
          openClosed: params.openClosed
        }
      )
    }
    this.closeModal()
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
