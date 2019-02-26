import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TokenService } from './token-services';
import { Platform } from 'ionic-angular';
import { UtilProvider } from '../providers/util-provider';
import { Network } from '@ionic-native/network';

@Injectable()
export class ApiService {

  private api_base_url = 'http://191.102.85.228:3312';
	private wifi: boolean = true;

  constructor(
    private http: Http,
    private tokenService: TokenService,
    private platform: Platform,
    private util: UtilProvider,
    private network: Network
    /*public navCtrl: NavController, */
  ) {

    /*  this.load(); */
  }

  /* 	load() {
      this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    this.util.presentToast('No tienes conexión a internet.');
      this.wifi = false;
      });
  
      //disconnectSubscription.unsubscribe();
      this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          this.wifi = true;
        console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
      });
    } */

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json'
    };
    if (this.tokenService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.tokenService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error);
  }

  /** Métodos Http que hacen peticiones a la api y retornan observables */

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${this.api_base_url}${path}`,
      { headers: this.setHeaders(), search: params }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  getComplete(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${path}`,
      { headers: this.setHeaders(), search: params }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.api_base_url}${path}`, JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  postComplete(path: string, body): Observable<any> {
    return this.http.post(`${path}`, body, { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) }
    )
      .catch(this.formatErrors)
      .map(res => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error('La petición ha fallado ' + res.status);
        }
        else {
          return res.json();
        }
      })
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.api_base_url}${path}`, body, { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map(res => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error('La petición ha fallado ' + res.status);
        }
        else {
          return res.json();
        }
      })
  }

  delete(path): Observable<any> {
    return this.http.delete(`${this.api_base_url}${path}`, { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }


}