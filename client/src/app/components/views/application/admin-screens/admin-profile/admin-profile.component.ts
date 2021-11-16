import {Component, OnInit} from '@angular/core';

import {AdminComponent} from "../admin/admin.component";

@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['../admin/admin.component.css']
})

export class AdminProfileComponent extends AdminComponent implements OnInit {

    ngOnInit(): void {
        super.ngOnInit();

        this.authenticationService.findAll().subscribe(userList => {
            this.userList = userList;
        });
    }

    getUsers() {
        this.authenticationService.findAll().subscribe(userList => {
            this.userList = userList;
        })
    }

    deleteUser(id: string) {
        if (confirm("Are you sure?")) {
            this.authenticationService.deleteById(id).subscribe(message => {
                this.getUsers();
                this.notifierService.notify("success", "User successfully deleted. ", "SUCCESS_USER_DELETE")
            })
        } else {
            this.notifierService.notify("error", "User not deleted. ", "FAIL_USER_DELETE")
        }
    }

    addUser() {
        this.authenticationService.create(this.newUserForm.getRawValue()).subscribe(message => {
            this.getUsers();
            this.newUserForm.reset();
        }, error => {
            for (let i = 0; i < error.error.errors.length; i++) {
                this.notifierService.notify('error', error.error.errors[i].field + ": " + error.error.errors[i].defaultMessage, 'LOGIN_ERROR');
            }
        })
    }


}
