import { Component, ViewChild, ElementRef } from '@angular/core'
import { NavController, NavParams, ModalController } from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database'

import { BuildingUserPage } from '../building/user/building/building'
import { BuildingUserSearchPage } from '../building/user/search/search'

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
          // let distance = this.getDistanceBetweenPoints(params).toFixed(2)
          this.addMarker(params)
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
          this.addMarker(params)
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
          this.addMarker(params)
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
          this.addMarker(params)
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
          this.addMarker(params)
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
          this.addMarker(params)
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
          this.addMarker(params)
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
          this.addMarker(params)
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
    if (this.nameMenu == 'news') {
      console.log('News Admin')
    }
    if (this.nameMenu == 'building') {
      page = BuildingUserPage
    }
    if (this.nameMenu == 'bank') {
      console.log('Bank Admin')
    }
    if (this.nameMenu == 'atm') {
      console.log('ATM Admin')
    }
    if (this.nameMenu == 'bus') {
      console.log('Bus Stop Admin')
    }
    if (this.nameMenu == 'dorm') {
      console.log('Dorm Admin')
    }
    if (this.nameMenu == 'parking') {
      console.log('Parking Admin')
    }
    if (this.nameMenu == 'cafe') {
      console.log('cafe Admin')
    }
    if (this.nameMenu == 'toilet') {
      console.log('Toilet Admin')
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
            buildingName: value.buildingName,
            lat: value.lat,
            lng: value.lng,
            initials: value.initials,
            openClosed: value.openClosed
          }
          this.addMarker(params)
        })
      })
      searchModal.present()
    }
    // if (this.nameMenu == "bank") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   })
    //   searchModal.onDidDismiss(data => {
    //     this.clear()
    //     data.forEach(value => {
    //       let params = {
    //         key: value.key,
    //         buildingName: value.buildingName,
    //         lat: value.lat,
    //         lng: value.lng,
    //         initials: value.initials,
    //         openClosed: value.openClosed
    //       }
    //       this.addMarker(params)
    //     })
    //   })
    //   searchModal.present()
    // }
    // if (this.nameMenu == "atm") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   })
    //   searchModal.onDidDismiss(data => {
    //     this.clear()
    //     data.forEach(value => {
    //       let params = {
    //         key: value.key,
    //         buildingName: value.buildingName,
    //         lat: value.lat,
    //         lng: value.lng,
    //         initials: value.initials,
    //         openClosed: value.openClosed
    //       }
    //       this.addMarker(params)
    //     })
    //   })
    //   searchModal.present()
    // }
    // if (this.nameMenu == "bus") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   })
    //   searchModal.onDidDismiss(data => {
    //     this.clear()
    //     data.forEach(value => {
    //       let params = {
    //         key: value.key,
    //         buildingName: value.buildingName,
    //         lat: value.lat,
    //         lng: value.lng,
    //         initials: value.initials,
    //         openClosed: value.openClosed
    //       }
    //       this.addMarker(params)
    //     })
    //   })
    //   searchModal.present()
    // }
    // if (this.nameMenu == "dorm") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   })
    //   searchModal.onDidDismiss(data => {
    //     this.clear()
    //     data.forEach(value => {
    //       let params = {
    //         key: value.key,
    //         buildingName: value.buildingName,
    //         lat: value.lat,
    //         lng: value.lng,
    //         initials: value.initials,
    //         openClosed: value.openClosed
    //       }
    //       this.addMarker(params)
    //     })
    //   })
    //   searchModal.present()
    // }
    // if (this.nameMenu == "parking") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   })
    //   searchModal.onDidDismiss(data => {
    //     this.clear()
    //     data.forEach(value => {
    //       let params = {
    //         key: value.key,
    //         buildingName: value.buildingName,
    //         lat: value.lat,
    //         lng: value.lng,
    //         initials: value.initials,
    //         openClosed: value.openClosed
    //       }
    //       this.addMarker(params)
    //     })
    //   })
    //   searchModal.present()
    // }
    // if (this.nameMenu == "cafe") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   })
    //   searchModal.onDidDismiss(data => {
    //     this.clear()
    //     data.forEach(value => {
    //       let params = {
    //         key: value.key,
    //         buildingName: value.buildingName,
    //         lat: value.lat,
    //         lng: value.lng,
    //         initials: value.initials,
    //         openClosed: value.openClosed
    //       }
    //       this.addMarker(params)
    //     })
    //   })
    //   searchModal.present()
    // }
    // if (this.nameMenu == "toilet") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   })
    //   searchModal.onDidDismiss(data => {
    //     this.clear()
    //     data.forEach(value => {
    //       let params = {
    //         key: value.key,
    //         buildingName: value.buildingName,
    //         lat: value.lat,
    //         lng: value.lng,
    //         initials: value.initials,
    //         openClosed: value.openClosed
    //       }
    //       this.addMarker(params)
    //     })
    //   })
    //   searchModal.present()
    // }
  }

  clear() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null)
    }
    this.markers = []
  }

}
