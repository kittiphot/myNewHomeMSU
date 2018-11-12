import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild("map") mapElement: ElementRef;
  private map: any;
  private itemsRef: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
    // this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(16.245616, 103.250208);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      // mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // this.getPlaceProfiles();
  }

  getPlaceProfiles() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(values => {
        let params = {
          id: values.key,
          name: values.payload.val()['name'],
          lat: values.payload.val()['lat'],
          long: values.payload.val()['long']
        }
        // let distance = this.getDistanceBetweenPoints(params).toFixed(2)
        this.addMarker(params, 1)
      });
    });
  }
  
  addMarker(params, distance) {
    let marker = new google.maps.Marker({
      map: this.map,
      title: params.name,
      animation: google.maps.Animation.DROP,
      // position: this.map.getCenter()
      position: new google.maps.LatLng(params.lat, params.long)
    });

    // let content = "<h4>Information!</h4>";
    let myLinkLocation = 'geo:' + params.lat + ',' + params.long + '?q=' + params.name;
    let content = 
      "<h5>" + params.name + "</h5>" + 
      distance + "<br>" + 
      "<a target='_blank' jstcache='6' href=" + myLinkLocation + "> <span>ดูใน Google Maps </span> </a>";

    this.addInfoWindow(marker, content, params);
  }

  addInfoWindow(marker, content, params) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.map, marker);
    });
  }

}
