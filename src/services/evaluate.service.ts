import { Injectable } from "@angular/core";
import { Http }    from '@angular/http';
import { ApiService } from './api-service';

@Injectable()
export class EvaluateService {

  data : any;
  http : any;

  constructor(http: Http, private api: ApiService) {
    this.http = http;
    this.data = null;
  }

  getQuestions(evaluate_id) {
    return this.api.get(`/evaluate/get-question/${evaluate_id}`);
  }

  response(email, evaluate_id, response){
    return this.api.post(`/evaluate/response`, {
      email: email, 
      evaluateId: evaluate_id,
      response: response
    });    
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }
}