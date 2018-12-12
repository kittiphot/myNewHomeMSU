import { Component, ElementRef, ViewChild } from '@angular/core'
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { HomePage } from '../home/home'
import { AtmAdminSearchPage } from '../atm/admin/search/search'
import { BankAdminSearchPage } from '../bank/admin/search/search'
import { BuildingAdminSearchPage } from '../building/admin/search/search'
import { BusAdminSearchPage } from '../bus/admin/search/search'
import { CafeAdminSearchPage } from '../cafe/admin/search/search'
import { DormAdminSearchPage } from '../dorm/admin/search/search'
import { ParkingAdminSearchPage } from '../parking/admin/search/search'
import { ToiletAdminSearchPage } from '../toilet/admin/search/search'

import { AtmAdminModalPage } from '../atm/admin/modal/modal'
import { BankAdminModalPage } from '../bank/admin/modal/modal'
import { BuildingAdminModalPage } from '../building/admin/modal/modal'
import { BusAdminModalPage } from '../bus/admin/modal/modal'
import { CafeAdminModalPage } from '../cafe/admin/modal/modal'
import { DormAdminModalPage } from '../dorm/admin/modal/modal'
import { ParkingAdminModalPage } from '../parking/admin/modal/modal'
import { ToiletAdminModalPage } from '../toilet/admin/modal/modal'

import { ShowAtmPage } from '../atm/admin/show/show'
import { ShowBankPage } from '../bank/admin/show/show'
import { ShowBuildingPage } from '../building/admin/show/show'
import { ShowBusPage } from '../bus/admin/show/show'

declare var google

@Component({
  selector: 'page-map-admin',
  templateUrl: 'map-admin.html',
})
export class MapAdminPage {

  @ViewChild("map") mapElement: ElementRef
  private map
  public itemsRef
  private nameMenu
  private markers

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private afDatabase: AngularFireDatabase,
    private modalCtrl: ModalController
  ) {
    this.nameMenu = navParams.get('nameMenu')
    this.itemsRef = this.afDatabase.list(this.nameMenu)
    this.markers = []
  }

  ionViewDidLoad() {
    this.loadMap()
    this.getPlaceProfiles()
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false)
  }

  goToHomePage() {
    this.navCtrl.push(HomePage)
  }

  search() {
    if (this.nameMenu == "building") {
      let searchModal = this.modalCtrl.create(BuildingAdminSearchPage)
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.buildingName,
            lat: value.lat,
            lng: value.lng
          }
          this.addMarker(params)
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "bank") {
      let searchModal = this.modalCtrl.create(BankAdminSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.bankName,
            lat: value.lat,
            lng: value.lng
          }
          this.addMarker(params)
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "atm") {
      let searchModal = this.modalCtrl.create(AtmAdminSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.placeName,
            lat: value.lat,
            lng: value.lng
          }
          this.addMarker(params)
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "bus") {
      let searchModal = this.modalCtrl.create(BusAdminSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.nameBus,
            lat: value.lat,
            lng: value.lng
          }
          this.addMarker(params)
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "dorm") {
      let searchModal = this.modalCtrl.create(DormAdminSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.dormName,
            lat: value.lat,
            lng: value.lng
          }
          this.addMarker(params)
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "parking") {
      let searchModal = this.modalCtrl.create(ParkingAdminSearchPage, {
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
          this.addMarker(params)
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "cafe") {
      let searchModal = this.modalCtrl.create(CafeAdminSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            key: value.key,
            name: value.cafeName,
            lat: value.lat,
            lng: value.lng
          }
          this.addMarker(params)
        })
      })
      searchModal.present()
    }
    if (this.nameMenu == "toilet") {
      let searchModal = this.modalCtrl.create(ToiletAdminSearchPage, {
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
          this.addMarker(params)
        })
      })
      searchModal.present()
    }
  }

  create() {
    let page
    if (this.nameMenu == 'building') {
      page = BuildingAdminModalPage
    }
    if (this.nameMenu == 'bank') {
      page = BankAdminModalPage
    }
    if (this.nameMenu == 'atm') {
      page = AtmAdminModalPage
    }
    if (this.nameMenu == 'bus') {
      page = BusAdminModalPage
    }
    if (this.nameMenu == 'dorm') {
      page = DormAdminModalPage
    }
    if (this.nameMenu == 'parking') {
      page = ParkingAdminModalPage
    }
    if (this.nameMenu == 'cafe') {
      page = CafeAdminModalPage
    }
    if (this.nameMenu == 'toilet') {
      page = ToiletAdminModalPage
    }
    let profileModal = this.modalCtrl.create(page)
    profileModal.present()
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

  getPlaceProfiles() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(values => {
        if (this.nameMenu == "building") {
          let params = {
            key: values.key,
            name: values.payload.val()['buildingName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          this.addMarker(params)
        }
        if (this.nameMenu == "bank") {
          let params = {
            key: values.key,
            name: values.payload.val()['bankName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          this.addMarker(params)
        }
        if (this.nameMenu == "atm") {
          let params = {
            key: values.key,
            name: values.payload.val()['placeName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          this.addMarker(params)
        }
        if (this.nameMenu == "bus") {
          let params = {
            key: values.key,
            name: values.payload.val()['nameBus'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          this.addMarker(params)
        }
        if (this.nameMenu == "dorm") {
          let params = {
            key: values.key,
            name: values.payload.val()['dormName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          this.addMarker(params)
        }
        if (this.nameMenu == "parking") {
          let params = {
            key: values.key,
            name: values.payload.val()['parkingName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          this.addMarker(params)
        }
        if (this.nameMenu == "cafe") {
          let params = {
            key: values.key,
            name: values.payload.val()['cafeName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          this.addMarker(params)
        }
        if (this.nameMenu == "toilet") {
          let params = {
            key: values.key,
            name: values.payload.val()['buildingName'],
            lat: values.payload.val()['lat'],
            lng: values.payload.val()['lng']
          }
          this.addMarker(params)
        }
      })
    })
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
      page = ShowBuildingPage
    }
    if (this.nameMenu == 'bank') {
      page = ShowBankPage
    }
    if (this.nameMenu == 'atm') {
      page = ShowAtmPage
    }
    if (this.nameMenu == 'bus') {
      page = ShowBusPage
    }
    // if (this.nameMenu == 'dorm') {
    //   page = DormUserPage
    // }
    // if (this.nameMenu == 'parking') {
    //   page = ParkingUserPage
    // }
    // if (this.nameMenu == 'cafe') {
    //   page = CafeUserPage
    // }
    // if (this.nameMenu == 'toilet') {
    //   page = ToiletUserPage
    // }
    google.maps.event.addListener(marker, "click", () => {
      let profileModal = this.modalCtrl.create(page, {
        key: params.key
      })
      profileModal.onDidDismiss(data => {
        this.clear()
        this.getPlaceProfiles()
      })
      profileModal.present()
    })
  }

  clear() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null)
    }
    this.markers = []
  }

  closeModal() {
    this.navCtrl.push(HomePage)
  }

}
