import { Injectable } from "@angular/core";
import { Http }    from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api-service';
import { TokenService } from './token-services';
import { UserModel } from '../models/user.model'

@Injectable()
export class Oauth2Service {

  data : any;
  http : any;
  public currentUserSubject = new BehaviorSubject<UserModel>(new UserModel());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  public isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    http: Http,
    public apiService: ApiService,
    public tokenService: TokenService
  ) {
    this.http = http;
    this.data = null;
  }
  /** Este método es llamado en la inicialización de la app y genera una sesión de usuario
  en caso de encontrar un token previamente almacenado.
  Pdta: Falta verificar vigencia del token */
  public populate() {
    if (this.tokenService.getToken()) {
      this.setUserSesion();
    } else {
      this.logout();
    }
  }

  /** Se obtiene el payload del token como un objeto de tipo usuario :(
      se asigna como asunto al observable que propagará los datos del usuario actual
      se asigna verdadero como asunto al observable que propagará el estado de sesión
  */
  public setUserSesion(){
    let payload: UserModel = this.tokenService.getPayload();
    this.currentUserSubject.next(payload);
    this.isAuthenticatedSubject.next(true);
  }
  /** Se destruye el token
      se asigna un usuario vacío como asunto al observable que propagará los datos del usuario actual
      se asigna falso como asunto al observable que propagará el estado de sesión
  */
  public logout() {
    this.tokenService.destroyToken();
    this.currentUserSubject.next(new UserModel());
    this.isAuthenticatedSubject.next(false);
  }

   public login(credentials): Observable<any> {
    return this.apiService.post('/user/login', credentials)
    .map(
      data => {
        if(data.token){
          this.tokenService.saveToken(data.token);
          this.setUserSesion();
          return data;
        } else {
           return data[0].description;
        }
    })
  } 
  public setCurrentUser(user: UserModel){
    this.currentUserSubject.next(user);
  }

  public isLogin(){
    return this.tokenService.getToken();
  }


  getAccessToken(code: string) {
    return this.http.post('http://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/token', JSON.stringify({
      grant_type: "authorization_code", 
      code: code,
      redirect_uri: "http://localhost/callback",
      client_id: "607027410088",
      client_secret: "r3wd4q0x12gmevyn4lp729vpl7gejy",
      state: "OK"
    }))
    .toPromise()
    .then(response => response.json(), this.handleError);
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }
}