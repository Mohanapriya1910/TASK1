import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  text="";
  email="";
  password="";
  message = '';
  errorMessage = ''; 
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle

  constructor(private authservice: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

  register()
  {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.registerWithEmail(this.email, this.password)
        .then(() => {
          this.message = "REGISTERED SUCCESSFULLY."
        }).catch((_error: { name: string; message: string; }) => {
          this.error = _error
          this.router.navigate(['/register'])
        })
    }
  }

  validateForm(email: string, password: string)
  {
    if(email.length === 0)
    {
      this.errorMessage = "Please enter valid email id";
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = "Please enter password";
      return false;
    }

    if (password.length < 6)
    {
      this.errorMessage = "Password should be at least 6 chararcter";
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
