import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data }  from './data'
@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient) { }
  GetData() {
    return this.http.get('https://raw.githubusercontent.com/l-lin/angular-datatables/master/demo/src/data/data.json');
  }

  GetDataJson() {
    return data
  }
}
