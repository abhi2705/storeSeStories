import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state: { active: boolean; mode?: string; msg?: string };
  loginForm: FormGroup;
  registerForm: FormGroup;
  otpForm: FormGroup;
  sub: Subscription;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.sub = this.auth.loginState.subscribe(s => { this.state = {...s}; });
    this.loginForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });
    this.registerForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.otpForm = this.formBuilder.group({
      d0: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d5: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });
  }

  onSubmit(): void {
    if (this.state.mode === 'mob') {
      this.auth.sendOtp(this.mobile.value);
      this.auth.showLogin('otp');
      return;
    }
    let otpString = '';
    for (let i = 0; i < 6; i++) {
      otpString += this.otp(i).value;
    }

    console.log(otpString);
    this.auth.verifyOtp(this.loginForm.get('mobile').value, otpString);
    this.form.reset();
  }

  get firstName(): AbstractControl {
    return this.form.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.form.get('lastName');
  }

  get mobile(): AbstractControl {
    return this.form.get('mobile');
  }

  get form(): FormGroup {
    switch (this.state.mode) {
      case 'mob':
        return this.loginForm;
      case 'otp':
        return this.otpForm;
      default:
        return undefined as FormGroup;
    }
  }

  otp(digit: number): AbstractControl {
    console.log(this.form.get('d' + digit).value);
    return this.form.get('d' + digit);
  }

  otpKeyup(event: Event, idx: number): void {
    if (idx < 3) {
      const el = document.getElementById('otpform-d' + (idx + 1));
      console.log(el);
      el.focus();
    }
    console.log(event);
  }

}
