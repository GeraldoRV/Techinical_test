import {Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {LoginService} from '../../service/login.service';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {'asc': 'desc', 'desc': '', '': 'asc'};
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'th[sortable]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
// tslint:disable-next-line:directive-class-suffix
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  addUserForm: FormGroup;
  roles: string[];
  private usersNotSort: User[];

  constructor(private fb: FormBuilder, private _userService: UserService, private _loginService: LoginService) {
  }

  private static getRoles() {
    return ['standard', 'admin'];
  }

  ngOnInit() {
    this.getUsers();
    this.roles = UserListComponent.getRoles();
    const array = this.roles.map(() => {
      return new FormControl(false);
    });
    this.addUserForm = this.fb.group(
      {
        name: [''],
        roles: new FormArray(array),

      }
    );
  }


  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
      this.users = this.usersNotSort;
    } else {
      this.users = [...this.usersNotSort].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }

  }

  onSubmit() {
    const user = new User();
    user.name = this.addUserForm.controls.name.value;
    user.roles = this.addUserForm.value.roles
      .map((v, i) => v ? this.roles[i] : null)
      .filter(v => v !== null);
    this._userService.createUser(user).subscribe(result => {
      this.usersNotSort.push(result);
    }, error => {
      console.log(error);
    });
    this.addUserForm.reset();
  }

  private getUsers() {
    this._userService.getAll().subscribe(result => {
      this.users = result;
      this.usersNotSort = this.users;
    }, error => {
      console.log(error);
    });
  }

  hasRole(admin: string) {
    return this._loginService.hasRole(admin);
  }
}
