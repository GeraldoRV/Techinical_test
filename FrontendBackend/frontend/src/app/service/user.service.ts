import {Injectable} from '@angular/core';
import {UserMemory} from '../memory/user-memory';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _userMemory: UserMemory) {
  }

  getAll() {
    return this._userMemory.getUsers();
  }

  createUser(user: User) {
    this._userMemory.addUser(user);
  }
}
