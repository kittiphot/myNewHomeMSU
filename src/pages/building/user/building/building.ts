import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-building',
  templateUrl: 'building.html',
})
export class BuildingUserPage {

  public params
  public star1
  public star2
  public star3
  public star4
  public star5

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController
  ) {
    this.params = {
      buildingName: 'คณะวิทยาการสารสนเทศ',
      lat: '16.24658423965131',
      lng: '103.25198898678582',
      initials: '',
      openClosed: ''
    }
    this.star1 = "dark"
    this.star2 = "dark"
    this.star3 = "dark"
    this.star4 = "dark"
    this.star5 = "dark"
  }

  changeColor(point) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    if (point == 1) {
      this.star1 = "light"
      this.star2 = "dark"
      this.star3 = "dark"
      this.star4 = "dark"
      this.star5 = "dark"
    }
    if (point == 2) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "dark"
      this.star4 = "dark"
      this.star5 = "dark"
    }
    if (point == 3) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "dark"
      this.star5 = "dark"
    }
    if (point == 4) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "light"
      this.star5 = "dark"
    }
    if (point == 5) {
      this.star1 = "light"
      this.star2 = "light"
      this.star3 = "light"
      this.star4 = "light"
      this.star5 = "light"
    }
    loading.dismiss()
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
