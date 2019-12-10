import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _loginService: LoginService, private _router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this._loginService.logout();
    this._router.navigate(['']).then();
  }

  isLogin() {
    return this._loginService.isLoginIn();
  }
}
