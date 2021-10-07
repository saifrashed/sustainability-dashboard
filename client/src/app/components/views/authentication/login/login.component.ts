import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../_services";
import {ActivatedRoute, Router} from "@angular/router";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {

    this.authenticationService.login("saif", "lars112")
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.log(error)
            });

  }

}
