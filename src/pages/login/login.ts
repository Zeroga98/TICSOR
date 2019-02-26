import { Component } from '@angular/core';
import { NavController, Platform, Events, LoadingController } from 'ionic-angular';
import { App, Nav } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Network } from '@ionic-native/network';
import { Firebase } from '@ionic-native/firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { UserModel } from '../../models/user.model';
import { Oauth2Service } from '../../services/oauth2.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token-services';

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
  public user: UserModel;
  private client_id = "170354734277-oc83im08kql9pfnuq1cv7n7g4g91p8nt.apps.googleusercontent.com";
  private client_secret = "ovXDzuvG4uv8wWhwHvenmAWx";
  private redirect_uri = "http://localhost/callback";
  public loading: any;

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    public nav: Nav,
    private platform: Platform,
    private oauth2Service: Oauth2Service,
    private authService: AuthService,
    private network: Network,
    private appBrowser: InAppBrowser,
    public events: Events,
    private tokenService: TokenService,
    private firebase: Firebase,
    private googlePlus: GooglePlus,
    private loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    this.user = new UserModel();

    this.network.onDisconnect().subscribe(() => {
      this.wifi = false;
    });
    //disconnectSubscription.unsubscribe();
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        if (this.network.type === 'wifi')
          this.wifi = true;
      }, 3000);
    });
  }

  public loginGoogle() {
    if (this.wifi && !this.loading) {
      this.presentLoading();
      this.platform.ready().then(() => {
        this.googleLogin().then(code => {
          this.authService.getTokenGoogle(code.detail, this.client_id, this.client_secret, this.redirect_uri)
          .subscribe(data => {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("id_token", data.id_token);
            this.authService.getProfileGoogle(data.access_token)
            .subscribe(user => {
              let scope = {
                NOMBRES: user.given_name,
                APELLIDOS: user.family_name,
                CORREO: user.email,
                FOTO: user.picture
              };
              this.authService.login(scope.NOMBRES, scope.APELLIDOS, scope.CORREO, scope.FOTO)
                .subscribe(token => {
                  this.user.save(scope);
                  this.tokenService.saveToken(token.token);
                  this.events.publish('user:exist', this.user.get());

                  this.dissmissLoading();
                  this.nav.setRoot(HomePage);
                }, error => {
                  console.log(error)
                  this.dissmissLoading();
                });
            });
          });
        });
      });
    }
  }

  private googleLogin(): Promise<any> {
    let scope = "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email";
    let api_url = "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&state=xyz&scope=" + scope;
    return new Promise((resolve, reject) => {
      let browserRef = this.appBrowser.create(api_url, "_blank", this.options);
      let closeSuccess = false;
      browserRef.on("loadstart").subscribe((event) => {
        if ((event.url).indexOf("http://localhost/callback") === 0) {
          closeSuccess = true;
          browserRef.close();
          let responseParameters = ((event.url).split("?")[1]).split("&");
          if (responseParameters[0].indexOf('xyz') != -1) {
            resolve({ detail: event.url.substring(event.url.lastIndexOf("code=") + 5, event.url.length), state: 'OK' });
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

  login() {
    if (this.wifi && !this.loading) {
      this.presentLoading();
      this.platform.ready().then(() => {
        this.chairaLogin().then(success => {
          this.oauth2Service.getAccessToken(success.detail)
            .then(response => {
              let scope = JSON.parse(response.scope)[0];
              this.authService.login(scope.NOMBRES, scope.APELLIDOS, scope.CORREO, scope.FOTO)
                .subscribe(token => {
                  this.user.save(scope);
                  this.tokenService.saveToken(token.token);
                  this.events.publish('user:exist', this.user.get());
                  this.dissmissLoading();
                  this.loading = undefined;
                  this.nav.setRoot(HomePage);
                }, error => {
                  this.dissmissLoading();
                });
            })
            .catch(error => {
              this.dissmissLoading();
            });
        }, (error) => {
          this.dissmissLoading();
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

  private presentLoading() {
    this.loading = this.loadingCtrl.create({ content: "Cargando..."});
    this.loading.present();
  }

  private dissmissLoading(){
    this.loading.dismiss();
    this.loading = undefined;
  }

}