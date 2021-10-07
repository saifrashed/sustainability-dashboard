import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../_services";
import {ActivatedRoute, Router} from "@angular/router";
import { first } from 'rxjs/operators';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),

    password: new FormControl(''),
  })

  constructor( private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {

    // this.authenticationService.login("saif", "lars112")
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //           console.log(data);
    //         },
    //         error => {
    //           console.log(error)
    //         });

  }

  onSubmit(){
    console.log(this.loginForm.value);
  }


}
