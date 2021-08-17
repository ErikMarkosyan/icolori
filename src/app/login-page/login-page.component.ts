import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
    
  })
  constructor(private router: Router, private storage : LocalStorageService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })
    this.storage.get('usersList')
  }

  onLogIn() {
    if(this.form.valid){
      this.router.navigate(['./canvas'])
    }
  }

  onSignUp() {
    this.router.navigate(['register'])
  }
}
