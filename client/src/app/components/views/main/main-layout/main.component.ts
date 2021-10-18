import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../_services";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public isLogged: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.isLogged = this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
  }

}
