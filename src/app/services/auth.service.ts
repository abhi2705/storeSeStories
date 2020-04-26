import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;
  private _loginState = new BehaviorSubject<{active: boolean, mode?: string, msg?: string}>({active: false});

  constructor(private api: ApiService) {
    this.token = '';
    this.refreshToken();
    console.log('Auth service intialised');
  }

  getToken(): string {
    return this.token;
  }

  get isLoggedIn(): boolean {
    return this._loggedIn.value;
  }
  get loggedIn(): BehaviorSubject<boolean> {
    return this._loggedIn;
  }

  get loginState(): BehaviorSubject<{active: boolean, mode?: string}> {
    return this._loginState;
  }

  refreshToken(): void {
    this.token = this.getLocalToken();
    if(this.token) {
      this.api.auth.verifyToken(this.token).subscribe(
        res => this.verificationSuccessfull(),
        err => this.showLogin('log', 'Session expired!')
      );
    } else {
      this.showLogin('log');
    }
  }

  login(email: string, password: string): void {
    this.api.auth.login(email, password).subscribe(res => {
      this.setToken(res.authToken);
      this.verificationSuccessfull();
    },
    err => {
      this.showLogin('log', 'Invalid credentials!');
    });
  }

  logout(): void {
    this.api.auth.logout().subscribe(res => {
      this.clearToken();
      this.refreshToken();
    });
  }

  sendOtp(mobile: string): void {
    this.api.auth.getOtp(mobile).subscribe();
  }

  register(email: string, password: string, firstName: string, lastName: string): void {
    this.api.auth.register(email, password, firstName,  lastName).subscribe(res => {
      console.log('register', res);
      this.login(email, password);
    });
  }

  verifyOtp(mobile: string, otp: string): void {
    this.api.auth.verifyOtp(mobile, otp).subscribe(
      res => { this.setToken(res.authToken); this.verificationSuccessfull(); },
      err => this.showLogin('otp', 'Invalid OTP!')
    );
  }

  showLogin(mode: string = 'log', msg?: string): void {
    if (msg) {
      this._loginState.next({active: true, mode, msg});
    }
    this._loginState.next({active: true, mode});
  }

  hideLogin(): void {
    this._loginState.next({active: false});
  }

  private loginIsVisible(): boolean {
    return this._loginState.getValue().active;
  }

  private verificationSuccessfull() {
    this._loggedIn.next(!this.loginIsVisible() || this.hideLogin() || true);
  }

  private setToken(token: string): void {
    localStorage.setItem('jwt', token);
    this.token = token;
  }

  private clearToken(): void {
    localStorage.removeItem('jwt');
  }

  private getLocalToken(): string {
    return localStorage.getItem('jwt');
  }
}
