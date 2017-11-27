import { Injectable } from "@angular/core";
import { Http }    from '@angular/http';
import { ApiService } from './api-service';

@Injectable()
export class CourseService {

  data : any;
  http : any;

  constructor(http: Http, private api: ApiService) {
    this.http = http;
    this.data = null;
  }

  getAll() {
    return this.api.get('/course/get-all');
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }
}