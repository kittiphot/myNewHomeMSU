import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'

var config = {
  apiKey: "AIzaSyDf91o_zJHk98Qi7kTAVLfA3-5JRL86pRc",
  authDomain: "mynewhomemsu-cf07f.firebaseapp.com",
  databaseURL: "https://mynewhomemsu-cf07f.firebaseio.com",
  projectId: "mynewhomemsu-cf07f",
  storageBucket: "mynewhomemsu-cf07f.appspot.com",
  messagingSenderId: "844761814782"
}

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { NewsPage } from '../pages/news/user/news/news'
import { MapPage } from '../pages/map/map'
import { BuildingAdminPage } from '../pages/building/admin/building/building'
import { BuildingAdminModalPage } from '../pages/building/admin/modal/modal'
import { BuildingAdminSearchPage } from '../pages/building/admin/search/search'
import { BuildingUserPage } from '../pages/building/user/building/building'
import { BuildingUserSearchPage } from '../pages/building/user/search/search'
 
let page =  [
  LoginPage,
  HomePage,
  NewsPage,
  MapPage,
  BuildingAdminPage,
  BuildingAdminModalPage,
  BuildingAdminSearchPage,
  BuildingUserPage,
  BuildingUserSearchPage
]

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
    AngularFireStorageModule,
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
