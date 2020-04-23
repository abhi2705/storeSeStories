import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavButtonService {

  private fav_btn_enabled = new BehaviorSubject(false);
  favEnabled = this.fav_btn_enabled.asObservable();

  constructor() { }

  toggleBtnView(enabled: boolean) {
    // console.log("here")
    this.fav_btn_enabled.next(enabled);
  }

}