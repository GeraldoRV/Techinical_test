import {Injectable} from '@angular/core';
import {UserMemory} from '../memory/user-memory';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: User;

  constructor(private _userMemory: UserMemory) {
  }

  login(name, password) {
    return this._userMemory.login(name, password);
  }

  setUserLogin(user: User) {
    this.user = user;

  }

  hasRole(role: string) {
    const roleFound = this.user.roles.find(roleName => roleName === role);
    return roleFound !== undefined;
  }

  isLoginIn() {
    return this.user !== undefined;
  }

  logout() {
    this.user = undefined;
  }
}
