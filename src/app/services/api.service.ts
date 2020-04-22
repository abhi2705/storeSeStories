/*
This file contains the class definition of the ApiService.
The actual Api endpoint calls are defined in the `api/` folder.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiList, Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends Api {
  // TODO: Shift the API_URL to config or enum and fetch it from there.
  private readonly API_URL = 'http://localhost:8000/api/';

  constructor(http: HttpClient) {
    super();
    ApiList.forEach(entry => {
      this[entry.name] = new entry.class(entry.endpoint, this.API_URL, http);
    });
  }
}
