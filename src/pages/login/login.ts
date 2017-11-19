import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App, Nav, Platform } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    public nav: Nav
  ) {

  }
  openPage() {
    this.nav.setRoot(HomePage);
} 
}
