import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild("map") mapElement: ElementRef
  private map
  private itemsRef
  private nameMenu
  private markers

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    // private modalCtrl: ModalController
  ) {
    this.nameMenu = navParams.get('nameMenu')
    this.itemsRef = this.afDatabase.list(this.nameMenu)
    this.markers = []
  }

  ionViewDidLoad() {
    this.loadMap();
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
  }

  // getPlaceProfiles() {
  //   this.itemsRef.snapshotChanges().subscribe(data => {
  //     data.forEach(values => {
  //       let params = {
  //         id: values.key,
  //         buildingName: values.payload.val()['buildingName'],
  //         lat: values.payload.val()['lat'],
  //         lng: values.payload.val()['lng'],
  //         initials: values.payload.val()['initials'],
  //         openClosed: values.payload.val()['openClosed']
  //       }
  //       // let distance = this.getDistanceBetweenPoints(params).toFixed(2)
  //       this.addMarker(params)
  //     })
  //   })
  // }

  // addMarker(params) {
  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     label: {text: params.buildingName, color: "yellow"},
  //     animation: google.maps.Animation.DROP,
  //     position: new google.maps.LatLng(params.lat, params.long)
  //   })
  //   this.markers.push(marker)
  //   // let content =
  //   //   "<h5>" + params.name + "</h5>" +
  //   //   "<a target='_blank' jstcache='6' href=" + 'geo:' + params.lat + ',' + params.long + '?q=' + params.name + "><span>ดูใน Google Maps </span> </a>"
  //   this.addInfoWindow(marker)
  // }

  // addInfoWindow(marker) {
  //   google.maps.event.addListener(marker, "click", () => {
  //     // let profileModal = this.modalCtrl.create(BuildingPage);
  //     // profileModal.present()
  //   });
  // }

  search() {
    // if (this.nameMenu == "buildingProfile") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   });
    //   searchModal.onDidDismiss(data => {
    //     this.clear()
    //     data.forEach(value => {
    //       let params = {
    //         id: value.key,
    //         buildingName: value.buildingName,
    //         lat: value.lat,
    //         lng: value.lng,
    //         initials: value.initials,
    //         openClosed: value.openClosed
    //       }
    //       this.addMarker(params)
    //     });
    //   });
    //   searchModal.present()
    // }
    // if (this.nameMenu == "bank") {
    //   let searchModal = this.modalCtrl.create(BankOfficeSearchPage);
    //   searchModal.present()
    // }
    // if (this.nameMenu == "a") {
    //   let searchModal = this.modalCtrl.create(AtmMachineSearchPage);
    //   searchModal.present()
    // }
    // if (this.nameMenu == "d") {
    //   let searchModal = this.modalCtrl.create(DormitorySearchPage);
    //   searchModal.present()
    // }
    // if (this.nameMenu == "p") {
    //   let searchModal = this.modalCtrl.create(ParkingPlaceSearchPage);
    //   searchModal.present()
    // }
    // if (this.nameMenu == "r") {
    //   let searchModal = this.modalCtrl.create(RestaurantCafeSearchPage);
    //   searchModal.present()
    // }
    // if (this.nameMenu == "t") {
    //   let searchModal = this.modalCtrl.create(ToiletSearchPage);
    //   searchModal.present()
    // }
    // if (this.nameMenu == "b") {
    //   let searchModal = this.modalCtrl.create(BusStopSearchPage);
    //   searchModal.present()
    // }
  }

  clear() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}
