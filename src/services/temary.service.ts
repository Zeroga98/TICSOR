import { Injectable } from "@angular/core";
import { Http }    from '@angular/http';
import { ApiService } from './api-service';

@Injectable()
export class TemaryService {

  data : any;
  http : any;

  constructor(http: Http, private api: ApiService) {
    this.http = http;
    this.data = null;
  }

  getAll(course) {
    return this.api.get(`/temary/get-all/${ course }`);
  }

  getContent(temaryId){
  	return this.api.get(`/temary/get-content/${ temaryId }`);	
  }

  getTest(temaryId){
  	return this.api.get(`/temary/get-question/${ temaryId }`);		
  }

  response(email, temary_id, response){
    return this.api.post(`/temary/response`, {
      email: email, 
      temary_id: temary_id,
      response: response
    });    
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }
}