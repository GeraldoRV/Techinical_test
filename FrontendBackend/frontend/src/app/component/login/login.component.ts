import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _loginService: LoginService, private _router: Router) {
  }

  ngOnInit() {
    if (this._loginService.isLoginIn()) {
      this._router.navigate(['users']).then();
      return;
    }
    this.loginForm = this.fb.group({
      name: [''],
      password: ['']
    });
  }

  onSubmit() {
    const name = this.loginForm.controls.name.value;
    const password = this.loginForm.controls.password.value;
    const user = this._loginService.login(name, password);
    if (user !== undefined) {
      this._loginService.setUserLogin(user);
      this._router.navigate(['/users']).then();

    } else {
      alert('Not found');
    }

  }
}
