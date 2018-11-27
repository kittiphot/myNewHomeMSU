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
import { Camera } from '@ionic-native/camera'

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
import { AtmAdminPage } from '../pages/atm/admin/atm/atm'
import { AtmAdminModalPage } from '../pages/atm/admin/modal/modal'
import { BankAdminPage } from '../pages/bank/admin/bank/bank'
import { BankAdminModalPage } from '../pages/bank/admin/modal/modal'
import { BuildingAdminPage } from '../pages/building/admin/building/building'
import { BuildingAdminModalPage } from '../pages/building/admin/modal/modal'
import { BuildingAdminSearchPage } from '../pages/building/admin/search/search'
import { BuildingUserPage } from '../pages/building/user/building/building'
import { BuildingUserSearchPage } from '../pages/building/user/search/search'
import { BusAdminPage } from '../pages/bus/admin/bus/bus'
import { BusAdminModalPage } from '../pages/bus/admin/modal/modal'
import { CafeAdminPage } from '../pages/cafe/admin/cafe/cafe'
import { CafeAdminModalPage } from '../pages/cafe/admin/modal/modal'
import { DormAdminPage } from '../pages/dorm/admin/dorm/dorm'
import { DormAdminModalPage } from '../pages/dorm/admin/modal/modal'
import { ParkingAdminiPage } from '../pages/parking/admin/parking/parking'
import { ParkingAdminModalPage } from '../pages/parking/admin/modal/modal'
import { ToiletAdminPage } from '../pages/toilet/admin/toilet/toilet'
import { ToiletAdminModalPage } from '../pages/toilet/admin/modal/modal'
import { MemberPage } from '../pages/member/member'
import { AdminPage } from '../pages/member/admin/admin'
import { AdminModalPage } from '../pages/member/modal/modal'
import { UserPage } from '../pages/member/user/user'
 
let page =  [
  LoginPage,
  HomePage,
  NewsPage,
  MapPage,
  AtmAdminPage,
  AtmAdminModalPage,
  BankAdminPage,
  BankAdminModalPage,
  BuildingAdminPage,
  BuildingAdminModalPage,
  BuildingAdminSearchPage,
  BuildingUserPage,
  BuildingUserSearchPage,
  BusAdminPage,
  BusAdminModalPage,
  CafeAdminPage,
  CafeAdminModalPage,
  DormAdminPage,
  DormAdminModalPage,
  ParkingAdminiPage,
  ParkingAdminModalPage,
  ToiletAdminPage,
  ToiletAdminModalPage,
  MemberPage,
  AdminPage,
  AdminModalPage,
  UserPage
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
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
