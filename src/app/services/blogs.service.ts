import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private bookmark_btn_enabled = new BehaviorSubject(false);
  boomkmarkEnabled = this.bookmark_btn_enabled.asObservable();

  constructor() { }

  toggleBookmarkBtnView(enabled: boolean) {
    this.bookmark_btn_enabled.next(enabled);
  }

}
