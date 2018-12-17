import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase'

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      var config = {
        apiKey: "AIzaSyAqR_SZXnH5YgR1ZuMBMFMhzR7hR_K8Uv4",
        authDomain: "mynewhomemsu-bfbac.firebaseapp.com",
        databaseURL: "https://mynewhomemsu-bfbac.firebaseio.com",
        projectId: "mynewhomemsu-bfbac",
        storageBucket: "mynewhomemsu-bfbac.appspot.com",
        messagingSenderId: "200325386174"
      }

      // firebase.initializeApp(config)
    });
  }
}

