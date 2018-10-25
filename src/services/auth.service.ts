import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from '@angular/http';
import { ApiService } from './api-service';

@Injectable()
export class AuthService {

  data: any;
  http: any;

  constructor(http: Http, private api: ApiService) {
    this.http = http;
    this.data = null;
  }

  getTokenGoogle(code: string, client_id: string, client_secret: string, redirect_uri: string) {
    let params = new URLSearchParams();
    params.set("grant_type", "authorization_code");
    params.set("code", code);
    params.set("client_id", client_id);
    params.set("client_secret", client_secret);
    params.set("redirect_uri", redirect_uri);
    return this.api.postComplete('https://accounts.google.com/o/oauth2/token', params);
  }

  getProfileGoogle(access_token){
    return this.api.getComplete('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + access_token);
  }

  login(names: string, lastnames: string, email: string, picture: string) {
    return this.api.post('/user/login', {
      nombres: names,
      apellidos: lastnames,
      correo: email,
      foto: picture
    });
  }

  handleError(error) {
    console.log(error);
    return error || 'Server error, please try again later';
  }
}