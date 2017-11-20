import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { App, Nav } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { Network } from '@ionic-native/network';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { Oauth2Service } from '../../services/oauth2.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  options: InAppBrowserOptions = {
    location: 'no',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };
  private wifi: boolean = true;

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    public nav: Nav,
    private platform: Platform,
    private oauth2Service: Oauth2Service,
    private network: Network,
    private appBrowser: InAppBrowser
  ) {
  }

  ionViewDidLoad() {
    this.network.onDisconnect().subscribe(() => {
      this.wifi = false;
    });

    //disconnectSubscription.unsubscribe();
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          this.wifi = true;
        }
      }, 3000);
    });
  }

  login() {
    if (this.wifi) {
      this.platform.ready().then(() => {
        this.chairaLogin().then(success => {
          this.oauth2Service.getAccessToken(success.detail)
            .then(response => {
              this.oauth2Service.getAccessToken(success.detail)
                .then(response => {
                  console.log(response);
                    this.nav.setRoot(HomePage);
                })
            })
            .catch(error => console.log(error))

        }, (error) => {
          console.log(error);
        });
      });
    } else {
      //this.util.presentToast('No tienes conexión a internet.');
    }

  }

  public chairaLogin(): Promise<any> {
    let api_url = "http://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/auth?response_type=code&client_id=607027410088&redirect_uri=http://localhost/callback&state=xyz";
    return new Promise((resolve, reject) => {
      let browserRef = this.appBrowser.create(api_url, "_blank", this.options);
      let closeSuccess = false;
      browserRef.on("loadstart").subscribe((event) => {
        if ((event.url).indexOf("http://localhost/callback") === 0) {
          closeSuccess = true;
          browserRef.close();
          let responseParameters = ((event.url).split("?")[1]).split("&");

          if (responseParameters[0].indexOf('error') == -1) {
            resolve({ detail: responseParameters[0].substring(5, responseParameters[0].length), state: 'OK' });
          } else if (responseParameters[0].substring(6, responseParameters[0].length) == 'access_denied') {
            reject({ detail: 'Esta aplicación no esta autorizada.', state: 'error_noti' });
          } else {
            console.log(responseParameters[0].substring(6, responseParameters[0].length));
            reject({ detail: 'Lo sentimos ocurrió un problema, intentalo de nuevo.', state: 'error_noti' });
          }
        }
      });
      browserRef.on("exit").subscribe((event) => {
        if (!closeSuccess) {
          reject({ detail: 'El usuario cancelo la autorización.', state: 'error' });
        }
      });
    });
  }

}