import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../_services";

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

    public id: string;
    public username: string;
    public email: string;
    public roles: string[];


    constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
        this.id = this.authenticationService.currentUserValue.id;
        this.username = this.authenticationService.currentUserValue.username;
        this.email = this.authenticationService.currentUserValue.email;
        this.roles = this.authenticationService.currentUserValue.roles;
    }

    ngOnInit(): void {
    }

    onLogout() {
        this.authenticationService.logout();
        this.router.navigate([""])
    }
}
