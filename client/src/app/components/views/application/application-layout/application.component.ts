import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../_services";

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

    public id: number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public role: string;
    public faculty: string;
    public token: any;
;

    constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
        this.id = this.authenticationService.currentUserValue.id;
        this.username = this.authenticationService.currentUserValue.username;
        this.firstName = this.authenticationService.currentUserValue.firstName;
        this.lastName = this.authenticationService.currentUserValue.lastName;
        this.role = this.authenticationService.currentUserValue.role;
        this.faculty = this.authenticationService.currentUserValue.faculty;
        this.token = this.authenticationService.currentUserValue.token;

    }

    ngOnInit(): void {
    }

    onLogout() {
        this.authenticationService.logout();
        this.router.navigate(["/account/login"])
    }
}
