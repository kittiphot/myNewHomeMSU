import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams, ModalController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { AtmUserPage } from '../atm/user/atm/atm'
import { AtmUserSearchPage } from '../atm/user/search/search'
import { BankUserPage } from '../bank/user/bank/bank'
import { BankUserSearchPage } from '../bank/user/search/search'
import { BuildingUserPage } from '../building/user/building/building'
import { BuildingUserSearchPage } from '../building/user/search/search'
import { BusUserPage } from '../bus/user/bus/bus'
import { BusUserSearchPage } from '../bus/user/search/search'
import { CafeUserPage } from '../cafe/user/cafe/cafe'
import { CafeUserSearchPage } from '../cafe/user/search/search'
import { DormUserPage } from '../dorm/user/dorm/dorm'
import { DormUserSearchPage } from '../dorm/user/search/search'
import { ParkingUserPage } from '../parking/user/parking/parking'
import { ParkingUserSearchPage } from '../parking/user/search/search'
import { ToiletUserPage } from '../toilet/user/toilet/toilet'
import { ToiletUserSearchPage } from '../toilet/user/search/search'

declare var google

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild("map") mapElement: ElementRef
  private map
  public itemsRef
  private nameMenu
  private markers

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private modalCtrl: ModalController
  ) {
    this.nameMenu = navParams.get('nameMenu')
    this.itemsRef = this.afDatabase.list(this.nameMenu)
    this.markers = []
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
  }

  getPlaceProfiles() {
    if (this.nameMenu == "building") {
      this.itemsRef.snapshotChanges().subscribe(data => {
        data.forEach(values => {
          let params = {
            key: values.key,
            name: values.payload.val()['buildingName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng'],
            initials: values.payload.val()['initials'],
            openClosed: values.payload.val()['openClosed']
          }
          if (values.payload.val()['status'] == 1) {
            this.addMarker(params)
          }
        })
      })
    }
    if (this.nameMenu == "bank") {
      this.itemsRef.snapshotChanges().subscribe(data => {
        data.forEach(values => {
          let params = {
            key: values.key,
            name: values.payload.val()['bankName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng'],
            openClosed: values.payload.val()['openClosed']
          }
          if (values.payload.val()['status'] == 1) {
            this.addMarker(params)
          }
        })
      })
    }
    if (this.nameMenu == "atm") {
      this.itemsRef.snapshotChanges().subscribe(data => {
        data.forEach(values => {
          let params = {
            key: values.key,
            name: values.payload.val()['placeName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng'],
            ATMName: values.payload.val()['ATMName']
          }
          if (values.payload.val()['status'] == 1) {
            this.addMarker(params)
          }
        })
      })
    }
    if (this.nameMenu == "bus") {
      this.itemsRef.snapshotChanges().subscribe(data => {
        data.forEach(values => {
          let params = {
            key: values.key,
            name: values.payload.val()['nameBus'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng'],
            detail: values.payload.val()['detail']
          }
          if (values.payload.val()['status'] == 1) {
            this.addMarker(params)
          }
        })
      })
    }
    if (this.nameMenu == "dorm") {
      this.itemsRef.snapshotChanges().subscribe(data => {
        data.forEach(values => {
          let params = {
            key: values.key,
            name: values.payload.val()['dormName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng'],
            openClosed: values.payload.val()['openClosed'],
            dailyAirConditioner: values.payload.val()['dailyAirConditioner'],
            monthlyAirConditioner: values.payload.val()['monthlyAirConditioner'],
            termAirConditioner: values.payload.val()['termAirConditioner'],
            dailyFan: values.payload.val()['dailyFan'],
            monthlyFan: values.payload.val()['monthlyFan'],
            termFan: values.payload.val()['termFan'],
            phoneNumber: values.payload.val()['phoneNumber'],
            contact: values.payload.val()['contact']
          }
          if (values.payload.val()['status'] == 1) {
            this.addMarker(params)
          }
        })
      })
    }
    if (this.nameMenu == "parking") {
      this.itemsRef.snapshotChanges().subscribe(data => {
        data.forEach(values => {
          let params = {
            key: values.key,
            name: values.payload.val()['parkingName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          if (values.payload.val()['status'] == 1) {
            this.addMarker(params)
          }
        })
      })
    }
    if (this.nameMenu == "cafe") {
      this.itemsRef.snapshotChanges().subscribe(data => {
        data.forEach(values => {
          let params = {
            key: values.key,
            name: values.payload.val()['cafeName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng'],
            price: values.payload.val()['price'],
            openClosed: values.payload.val()['openClosed'],
            phoneNumber: values.payload.val()['phoneNumber'],
            contact: values.payload.val()['contact']
          }
          if (values.payload.val()['status'] == 1) {
            this.addMarker(params)
          }
        })
      })
    }
    if (this.nameMenu == "toilet") {
      this.itemsRef.snapshotChanges().subscribe(data => {
        data.forEach(values => {
          let params = {
            key: values.key,
            name: values.payload.val()['buildingName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          if (values.payload.val()['status'] == 1) {
            this.addMarker(params)
          }
        })
      })
    }
  }

  addMarker(params) {
    let marker = new google.maps.Marker({
      map: this.map,
      label: { text: params.name, color: "yellow" },
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(params.lat, params.lng)
    })
    this.markers.push(marker)
    this.addInfoWindow(marker, params)
  }

  addInfoWindow(marker, params) {
    let page
    if (this.nameMenu == 'building') {
      page = BuildingUserPage
    }
    if (this.nameMenu == 'bank') {
      page = BankUserPage
    }
    if (this.nameMenu == 'atm') {
      page = AtmUserPage
    }
    if (this.nameMenu == 'bus') {
      page = BusUserPage
    }
    if (this.nameMenu == 'dorm') {
      page = DormUserPage
    }
    if (this.nameMenu == 'parking') {
      page = ParkingUserPage
    }
    if (this.nameMenu == 'cafe') {
      page = CafeUserPage
    }
    if (this.nameMenu == 'toilet') {
      page = ToiletUserPage
    }
    google.maps.event.addListener(marker, "click", () => {
      let profileModal = this.modalCtrl.create(page, {
        key: params.key
      })
      profileModal.present()
    })
  }

  search() {
    if (this.nameMenu == "building") {
      let searchModal = this.modalCtrl.create(BuildingUserSearchPage)
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.buildingName,
            lat: value.lat,
            lng: value.lng,
            initials: value.initials,
            openClosed: value.openClosed
          }
          if (value.status == 1) {
            this.addMarker(params)
          }
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "bank") {
      let searchModal = this.modalCtrl.create(BankUserSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.bankName,
            lat: value.lat,
            lng: value.lng,
            openClosed: value.openClosed
          }
          if (value.status == 1) {
            this.addMarker(params)
          }
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "atm") {
      let searchModal = this.modalCtrl.create(AtmUserSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.placeName,
            lat: value.lat,
            lng: value.lng,
            ATMName: value.ATMName
          }
          if (value.status == 1) {
            this.addMarker(params)
          }
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "bus") {
      let searchModal = this.modalCtrl.create(BusUserSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.nameBus,
            lat: value.lat,
            lng: value.lng,
            detail: value.detail
          }
          if (value.status == 1) {
            this.addMarker(params)
          }
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "dorm") {
      let searchModal = this.modalCtrl.create(DormUserSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.dormName,
            lat: value.lat,
            lng: value.lng,
            openClosed: value.openClosed,
            dailyAirConditioner: value.dailyAirConditioner,
            monthlyAirConditioner: value.monthlyAirConditioner,
            termAirConditioner: value.termAirConditioner,
            dailyFan: value.dailyFan,
            monthlyFan: value.monthlyFan,
            termFan: value.termFan,
            phoneNumber: value.phoneNumber,
            contact: value.contact
          }
          if (value.status == 1) {
            this.addMarker(params)
          }
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "parking") {
      let searchModal = this.modalCtrl.create(ParkingUserSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.parkingName,
            lat: value.lat,
            lng: value.lng
          }
          if (value.status == 1) {
            this.addMarker(params)
          }
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "cafe") {
      let searchModal = this.modalCtrl.create(CafeUserSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.cafeName,
            lat: value.lat,
            lng: value.lng,
            price: value.price,
            openClosed: value.openClosed,
            phoneNumber: value.phoneNumber,
            contact: value.contact
          }
          if (value.status == 1) {
            this.addMarker(params)
          }
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "toilet") {
      let searchModal = this.modalCtrl.create(ToiletUserSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.buildingName,
            lat: value.lat,
            lng: value.lng
          }
          if (value.status == 1) {
            this.addMarker(params)
          }
        })
      })
      searchModal.present()
    }
  }

  clear() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null)
    }
    this.markers = []
  }

}
