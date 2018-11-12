import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { NewsPage } from '../pages/news/news'
import { MapPage } from '../pages/map/map'
 
let page =  [
  LoginPage,
  HomePage,
  NewsPage,
  MapPage
]

var config = {
  apiKey: "AIzaSyC0Eu2Qea3-8FNuZbTxOtmO_q0yahrjTpk",
  authDomain: "mynewhomemsu-db952.firebaseapp.com",
  databaseURL: "https://mynewhomemsu-db952.firebaseio.com",
  projectId: "mynewhomemsu-db952",
  storageBucket: "mynewhomemsu-db952.appspot.com",
  messagingSenderId: "143793453488"
};

@NgModule({
  declarations: [
    MyApp,
    page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
