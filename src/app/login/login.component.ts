import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm;

  constructor(
    private router: Router
  ) {

    this.loginForm = new FormGroup({
      name: new FormControl(''),
      password: new FormControl('')
    })

  }

  ngOnInit() { }

  onSubmit(form){

    console.log(1);
    
    this.router.navigate([''])
  }

}
