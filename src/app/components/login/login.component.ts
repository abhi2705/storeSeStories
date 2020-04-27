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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      cfPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]))
    }, {
      validators: this.cfPasswordValidator.bind(this)
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
    if (this.state.mode === 'reg') {
      this.auth.register(this.email.value, this.password.value, this.firstName.value, this.lastName.value);
    } else if (this.state.mode === 'log') {
      this.auth.login(this.email.value, this.password.value);
    } else if (this.state.mode === 'out') {
      this.auth.logout(true);
    }
  }

  cancelLogout(): void {
    this.auth.hideLogin();
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
      case 'log':
        return this.loginForm;
      case 'reg':
        return this.registerForm;
      default:
        return undefined as FormGroup;
    }
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get cfPassword(): AbstractControl {
    return this.form.get('cfPassword');
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

  cfPasswordValidator(fg: FormGroup) {
    const { value: pass } = fg.get('password');
    const { value: cfpass } = fg.get('cfPassword');
    return pass === cfpass ? null : { passwordNotMatch: true };
  }

  switchMode(mode: string) {
    this.form.reset();
    this.auth.showLogin(mode);
  }
}
