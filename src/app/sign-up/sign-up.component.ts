import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/storage.service';
import { IUsers } from '../interfaces/users.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  usersList: IUsers[] = [];
  usersListName = 'usersList';
  constructor(private storage: LocalStorageService, private router: Router) {}
  ngOnInit(): void {
    this.getUsers();
    if (this.storage.get('loggedInUser')?.length) {
      this.router.navigate(['/canvas']).then((r) => r);
    }
  }

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$'),
    ]),
    confirmPassword: new FormControl('', Validators.required),
  });

  password() {
    const password = this.form.controls.password.value;
    const confirmedPassword = this.form.controls.confirmPassword.value;
    if (password && confirmedPassword) {
      return password === confirmedPassword;
    }
    return false;
  }
  getUsers(): void {
    const users = this.storage.get(this.usersListName);
    if (users) {
      this.usersList = JSON.parse(users);
    }
  }

  register() {
    if (this.form.valid) {
      this.usersList.push(this.form.value);
      const usersListStr = JSON.stringify(this.usersList);
      this.storage.set(this.usersListName, usersListStr);
    
    }
  }
}
