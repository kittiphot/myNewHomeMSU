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
import { ToastController } from 'ionic-angular'

var config = {
  apiKey: "AIzaSyAqR_SZXnH5YgR1ZuMBMFMhzR7hR_K8Uv4",
  authDomain: "mynewhomemsu-bfbac.firebaseapp.com",
  databaseURL: "https://mynewhomemsu-bfbac.firebaseio.com",
  projectId: "mynewhomemsu-bfbac",
  storageBucket: "mynewhomemsu-bfbac.appspot.com",
  messagingSenderId: "200325386174"
}

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { MapPage } from '../pages/map/map'

import { AtmAdminPage } from '../pages/atm/admin/atm/atm'
import { AtmAdminModalPage } from '../pages/atm/admin/modal/modal'
import { AtmAdminSearchPage } from '../pages/atm/admin/search/search'
import { AtmUserPage } from '../pages/atm/user/atm/atm'
import { AtmUserSearchPage } from '../pages/atm/user/search/search'

import { BankAdminPage } from '../pages/bank/admin/bank/bank'
import { BankAdminModalPage } from '../pages/bank/admin/modal/modal'
import { BankAdminSearchPage } from '../pages/bank/admin/search/search'
import { BankUserPage } from '../pages/bank/user/bank/bank'
import { BankUserSearchPage } from '../pages/bank/user/search/search'

import { BuildingAdminPage } from '../pages/building/admin/building/building'
import { BuildingAdminModalPage } from '../pages/building/admin/modal/modal'
import { BuildingAdminSearchPage } from '../pages/building/admin/search/search'
import { BuildingUserPage } from '../pages/building/user/building/building'
import { BuildingUserSearchPage } from '../pages/building/user/search/search'

import { BusAdminPage } from '../pages/bus/admin/bus/bus'
import { BusAdminModalPage } from '../pages/bus/admin/modal/modal'
import { BusAdminSearchPage } from '../pages/bus/admin/search/search'
import { BusUserPage } from '../pages/bus/user/bus/bus'
import { BusUserSearchPage } from '../pages/bus/user/search/search'

import { CafeAdminPage } from '../pages/cafe/admin/cafe/cafe'
import { CafeAdminModalPage } from '../pages/cafe/admin/modal/modal'
import { CafeAdminSearchPage } from '../pages/cafe/admin/search/search'
import { CafeUserPage } from '../pages/cafe/user/cafe/cafe'
import { CafeUserSearchPage } from '../pages/cafe/user/search/search'

import { NewsAdminPage } from '../pages/news/admin/news/news'
import { NewsAdminModalPage } from '../pages/news/admin/modal/modal'
import { NewsAdminSearchPage } from '../pages/news/admin/search/search'
import { NewsUserPage } from '../pages/news/user/news/news'
import { NewsUserModalPage } from '../pages/news/user/modal/modal'
import { NewsUserSearchPage } from '../pages/news/user/search/search'

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
import { PasswordPage } from '../pages/member/password/password'
import { DormUserPage } from '../pages/dorm/user/dorm/dorm'
import { DormUserSearchPage } from '../pages/dorm/user/search/search'
import { ParkingUserPage } from '../pages/parking/user/parking/parking'
import { ParkingUserSearchPage } from '../pages/parking/user/search/search'
import { ToiletUserPage } from '../pages/toilet/user/toilet/toilet'
import { ToiletUserSearchPage } from '../pages/toilet/user/search/search'
 
let page =  [
  HomePage,
  LoginPage,
  MapPage,

  AtmAdminPage,
  AtmAdminModalPage,
  AtmAdminSearchPage,
  AtmUserPage,
  AtmUserSearchPage,
  
  BankAdminPage,
  BankAdminModalPage,
  BankAdminSearchPage,
  BankUserPage,
  BankUserSearchPage,
  
  BuildingAdminPage,
  BuildingAdminModalPage,
  BuildingAdminSearchPage,
  BuildingUserPage,
  BuildingUserSearchPage,
  
  BusAdminPage,
  BusAdminModalPage,
  BusAdminSearchPage,
  BusUserPage,
  BusUserSearchPage,

  CafeAdminPage,
  CafeAdminModalPage,
  CafeAdminSearchPage,
  CafeUserPage,
  CafeUserSearchPage,

  NewsAdminPage,
  NewsAdminModalPage,
  NewsAdminSearchPage,
  NewsUserPage,
  NewsUserModalPage,
  NewsUserSearchPage,

  ToiletUserSearchPage,
  ToiletUserPage,
  ParkingUserSearchPage,
  ParkingUserPage,
  DormUserSearchPage,
  DormUserPage,
  DormAdminPage,
  DormAdminModalPage,
  ParkingAdminiPage,
  ParkingAdminModalPage,
  ToiletAdminPage,
  ToiletAdminModalPage,
  MemberPage,
  AdminPage,
  AdminModalPage,
  UserPage,
  PasswordPage,
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
    ToastController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
