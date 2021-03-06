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
import { Facebook } from '@ionic-native/facebook'
import { Geolocation } from '@ionic-native/geolocation'
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAqR_SZXnH5YgR1ZuMBMFMhzR7hR_K8Uv4",
  authDomain: "mynewhomemsu-bfbac.firebaseapp.com",
  databaseURL: "https://mynewhomemsu-bfbac.firebaseio.com",
  projectId: "mynewhomemsu-bfbac",
  storageBucket: "mynewhomemsu-bfbac.appspot.com",
  messagingSenderId: "200325386174"
}

firebase.initializeApp(config)

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { MapPage } from '../pages/map/map'
import { MapAdminPage } from '../pages/map-admin/map-admin'

import { MemberPage } from '../pages/member/member'
import { AdminPage } from '../pages/member/admin/admin'
import { AdminModalPage } from '../pages/member/modal/modal'
import { UserPage } from '../pages/member/user/user'
import { PasswordPage } from '../pages/member/password/password'

import { AtmAdminPage } from '../pages/atm/admin/atm/atm'
import { AtmAdminModalPage } from '../pages/atm/admin/modal/modal'
import { AtmAdminSearchPage } from '../pages/atm/admin/search/search'
import { AtmAdminCommentPage } from '../pages/atm/admin/comment/comment'
import { ShowAtmPage } from '../pages/atm/admin/show/show'
import { AtmUserPage } from '../pages/atm/user/atm/atm'
import { AtmUserSearchPage } from '../pages/atm/user/search/search'
import { AtmCommentPage } from '../pages/atm/user/comment/comment/comment'
import { AtmCommentModalPage } from '../pages/atm/user/comment/modal/modal'

import { BankAdminPage } from '../pages/bank/admin/bank/bank'
import { BankAdminModalPage } from '../pages/bank/admin/modal/modal'
import { BankAdminSearchPage } from '../pages/bank/admin/search/search'
import { BankAdminCommentPage } from '../pages/bank/admin/comment/comment'
import { ShowBankPage } from '../pages/bank/admin/show/show'
import { BankUserPage } from '../pages/bank/user/bank/bank'
import { BankUserSearchPage } from '../pages/bank/user/search/search'
import { BankCommentPage } from '../pages/bank/user/comment/comment/comment'
import { BankCommentModalPage } from '../pages/bank/user/comment/modal/modal'

import { BankNamePage } from '../pages/bank-name/bank-name/bank-name'
import { BankNameModalPage } from '../pages/bank-name/modal/modal'
import { BankNameSearchPage } from '../pages/bank-name/search/search'

import { BuildingAdminPage } from '../pages/building/admin/building/building'
import { BuildingAdminModalPage } from '../pages/building/admin/modal/modal'
import { BuildingAdminSearchPage } from '../pages/building/admin/search/search'
import { BuildingAdminCommentPage } from '../pages/building/admin/comment/comment'
import { ShowBuildingPage } from '../pages/building/admin/show/show'
import { BuildingUserPage } from '../pages/building/user/building/building'
import { BuildingUserSearchPage } from '../pages/building/user/search/search'
import { BuildingCommentPage } from '../pages/building/user/comment/comment/comment'
import { BuildingCommentModalPage } from '../pages/building/user/comment/modal/modal'

import { BuildingNamePage } from '../pages/building-name/building-name/building-name'
import { BuildingNameModalPage } from '../pages/building-name/modal/modal'
import { BuildingNameSearchPage } from '../pages/building-name/search/search'

import { BusAdminPage } from '../pages/bus/admin/bus/bus'
import { BusAdminModalPage } from '../pages/bus/admin/modal/modal'
import { BusAdminSearchPage } from '../pages/bus/admin/search/search'
import { BusAdminCommentPage } from '../pages/bus/admin/comment/comment'
import { ShowBusPage } from '../pages/bus/admin/show/show'
import { BusUserPage } from '../pages/bus/user/bus/bus'
import { BusUserSearchPage } from '../pages/bus/user/search/search'
import { BusCommentPage } from '../pages/bus/user/comment/comment/comment'
import { BusCommentModalPage } from '../pages/bus/user/comment/modal/modal'

import { CafeAdminPage } from '../pages/cafe/admin/cafe/cafe'
import { CafeAdminModalPage } from '../pages/cafe/admin/modal/modal'
import { CafeAdminSearchPage } from '../pages/cafe/admin/search/search'
import { CafeAdminCommentPage } from '../pages/cafe/admin/comment/comment'
import { ShowCafePage } from '../pages/cafe/admin/show/show'
import { CafeUserPage } from '../pages/cafe/user/cafe/cafe'
import { CafeUserSearchPage } from '../pages/cafe/user/search/search'
import { CafeCommentPage } from '../pages/cafe/user/comment/comment/comment'
import { CafeCommentModalPage } from '../pages/cafe/user/comment/modal/modal'

import { CafeTypePage } from '../pages/cafe-type/cafe-type/cafe-type'
import { CafeTypeModalPage } from '../pages/cafe-type/modal/modal'
import { CafeTypeSearchPage } from '../pages/cafe-type/search/search'

import { DormAdminPage } from '../pages/dorm/admin/dorm/dorm'
import { DormAdminModalPage } from '../pages/dorm/admin/modal/modal'
import { DormAdminSearchPage } from '../pages/dorm/admin/search/search'
import { DormAdminCommentPage } from '../pages/dorm/admin/comment/comment'
import { ShowDormPage } from '../pages/dorm/admin/show/show'
import { DormUserPage } from '../pages/dorm/user/dorm/dorm'
import { DormUserSearchPage } from '../pages/dorm/user/search/search'
import { DormCommentPage } from '../pages/dorm/user/comment/comment/comment'
import { DormCommentModalPage } from '../pages/dorm/user/comment/modal/modal'

import { NewsAdminPage } from '../pages/news/admin/news/news'
import { NewsAdminModalPage } from '../pages/news/admin/modal/modal'
import { NewsAdminSearchPage } from '../pages/news/admin/search/search'
import { NewsUserPage } from '../pages/news/user/news/news'
import { NewsUserModalPage } from '../pages/news/user/modal/modal'
import { NewsUserSearchPage } from '../pages/news/user/search/search'

import { ParkingAdminiPage } from '../pages/parking/admin/parking/parking'
import { ParkingAdminModalPage } from '../pages/parking/admin/modal/modal'
import { ParkingAdminSearchPage } from '../pages/parking/admin/search/search'
import { ParkingAdminCommentPage } from '../pages/parking/admin/comment/comment'
import { ShowParkingPage } from '../pages/parking/admin/show/show'
import { ParkingUserPage } from '../pages/parking/user/parking/parking'
import { ParkingUserSearchPage } from '../pages/parking/user/search/search'
import { ParkingCommentPage } from '../pages/parking/user/comment/comment/comment'
import { ParkingCommentModalPage } from '../pages/parking/user/comment/modal/modal'

import { ToiletAdminPage } from '../pages/toilet/admin/toilet/toilet'
import { ToiletAdminModalPage } from '../pages/toilet/admin/modal/modal'
import { ToiletAdminSearchPage } from '../pages/toilet/admin/search/search'
import { ToiletAdminCommentPage } from '../pages/toilet/admin/comment/comment'
import { ShowToiletPage } from '../pages/toilet/admin/show/show'
import { ToiletUserPage } from '../pages/toilet/user/toilet/toilet'
import { ToiletUserSearchPage } from '../pages/toilet/user/search/search'
import { ToiletCommentPage } from '../pages/toilet/user/comment/comment/comment'
import { ToiletCommentModalPage } from '../pages/toilet/user/comment/modal/modal'
 
let page =  [
  HomePage,
  LoginPage,
  MapPage,
  MapAdminPage,

  MemberPage,
  AdminPage,
  AdminModalPage,
  UserPage,
  PasswordPage,

  AtmAdminPage,
  AtmAdminModalPage,
  AtmAdminSearchPage,
  AtmAdminCommentPage,
  ShowAtmPage,
  AtmUserPage,
  AtmUserSearchPage,
  AtmCommentPage,
  AtmCommentModalPage,
  
  BankAdminPage,
  BankAdminModalPage,
  BankAdminSearchPage,
  BankAdminCommentPage,
  ShowBankPage,
  BankUserPage,
  BankUserSearchPage,
  BankCommentPage,
  BankCommentModalPage,

  BankNamePage,
  BankNameModalPage,
  BankNameSearchPage,
  
  BuildingAdminPage,
  BuildingAdminModalPage,
  BuildingAdminSearchPage,
  BuildingAdminCommentPage,
  ShowBuildingPage,
  BuildingUserPage,
  BuildingUserSearchPage,
  BuildingCommentPage,
  BuildingCommentModalPage,

  BuildingNamePage,
  BuildingNameModalPage,
  BuildingNameSearchPage,
  
  BusAdminPage,
  BusAdminModalPage,
  BusAdminSearchPage,
  BusAdminCommentPage,
  ShowBusPage,
  BusUserPage,
  BusUserSearchPage,
  BusCommentPage,
  BusCommentModalPage,

  CafeAdminPage,
  CafeAdminModalPage,
  CafeAdminSearchPage,
  CafeAdminCommentPage,
  ShowCafePage,
  CafeUserPage,
  CafeUserSearchPage,
  CafeCommentPage,
  CafeCommentModalPage,

  CafeTypePage,
  CafeTypeModalPage,
  CafeTypeSearchPage,

  DormAdminPage,
  DormAdminModalPage,
  DormAdminSearchPage,
  DormAdminCommentPage,
  ShowDormPage,
  DormUserPage,
  DormUserSearchPage,
  DormCommentPage,
  DormCommentModalPage,

  NewsAdminPage,
  NewsAdminModalPage,
  NewsAdminSearchPage,
  NewsUserPage,
  NewsUserModalPage,
  NewsUserSearchPage,

  ParkingAdminiPage,
  ParkingAdminModalPage,
  ParkingAdminSearchPage,
  ParkingAdminCommentPage,
  ShowParkingPage,
  ParkingUserPage,
  ParkingUserSearchPage,
  ParkingCommentPage,
  ParkingCommentModalPage,

  ToiletAdminPage,
  ToiletAdminModalPage,
  ToiletAdminSearchPage,
  ToiletAdminCommentPage,
  ShowToiletPage,
  ToiletUserPage,
  ToiletUserSearchPage,
  ToiletCommentPage,
  ToiletCommentModalPage
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
    AngularFireAuthModule,
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
    Facebook,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
