import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShareTab } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ShareTabService {

  private currentState: ShareTab = {isActive: false, brandUrl: ''}
  private _shareTabState = new BehaviorSubject<ShareTab>(this.currentState);
  constructor() { }

  get shareTabState(): Observable<ShareTab> {
    return this._shareTabState.asObservable();
  }

  activate(brandUrl: string): void {
    this.currentState = {isActive: true, brandUrl};
    this._shareTabState.next({...this.currentState});
  }

  deactivate(): void {
    this.currentState = {isActive: false, brandUrl: ''};
    this._shareTabState.next({...this.currentState});
  }

  toggle(brandUrl?: string): boolean {
    if (this.currentState.isActive) {
      this.deactivate();
      return false;
    }
    brandUrl = brandUrl || '';
    this.activate(brandUrl);
    return true;
  }
}
