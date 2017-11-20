import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App, Nav } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    public nav: Nav,
    private googlePlus: GooglePlus
  ) {
  }

  openPage() {
    this.nav.setRoot(HomePage);
  }

  loginGoogle(){
       this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

}
