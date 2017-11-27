import { Injectable } from "@angular/core";
import { Http }    from '@angular/http';
import { ApiService } from './api-service';

@Injectable()
export class QrService {

  data : any;
  http : any;

  constructor(http: Http, private api: ApiService) {
    this.http = http;
    this.data = null;
  }

  getQr(theme) {
    return this.api.get(`/temary/get-qr/${ theme }`);
  }


  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }
}