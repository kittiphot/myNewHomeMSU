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
            id: values.key,
            buildingName: values.payload.val()['buildingName'],
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
  }

  addMarker(params) {
    let marker = new google.maps.Marker({
      map: this.map,
      label: { text: params.buildingName, color: "yellow" },
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(params.lat, params.lng)
    })
    this.markers.push(marker)
    this.addInfoWindow(marker)
  }

  addInfoWindow(marker) {
    google.maps.event.addListener(marker, "click", () => {
      let profileModal = this.modalCtrl.create(BuildingUserPage)
      profileModal.present()
    })
  }

  search() {
    if (this.nameMenu == "building") {
      let searchModal = this.modalCtrl.create(BuildingUserSearchPage, {
        nameMenu: this.nameMenu
      })
      searchModal.onDidDismiss(data => {
        this.clear()
        data.forEach(value => {
          let params = {
            id: value.key,
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
    //         id: value.key,
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
    // if (this.nameMenu == "ATM") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   })
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
    //         id: value.key,
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
    //         id: value.key,
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
    //         id: value.key,
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
    // if (this.nameMenu == "restaurant") {
    //   let searchModal = this.modalCtrl.create(BuildingSearchPage, {
    //     nameMenu: this.nameMenu
    //   })
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
    //         id: value.key,
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
