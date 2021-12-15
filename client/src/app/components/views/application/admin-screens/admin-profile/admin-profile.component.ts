import {Component, OnInit} from '@angular/core';

import {AdminComponent} from "../admin/admin.component";
import faculties from "src/assets/data/faculties.js"



@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['../admin/admin.component.css']
})

export class AdminProfileComponent extends AdminComponent implements OnInit {

    public faculties: any[] = null;

    ngOnInit(): void {
        super.ngOnInit();
        this.faculties = faculties;

        this.authenticationService.findAll().subscribe(userList => {
            this.userList = userList;
        });
    }


    selectProfile(id: string) {
        this.authenticationService.findById(id).subscribe(user => {
            console.log(user);

            this.updateUserForm.controls["id"].setValue(user.id);
            this.updateUserForm.controls["username"].setValue(user.username);
            this.updateUserForm.controls["email"].setValue(user.email);
            this.updateUserForm.controls["faculty"].setValue(user.faculty);
            this.updateUserForm.controls["programme"].setValue(user.programme);
            this.updateUserForm.controls["role"].setValue(user.roles);
        })
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

    updateUser() {

        this.authenticationService.update(this.updateUserForm.getRawValue()).subscribe(result => {
            console.log(this.updateUserForm.getRawValue())
            console.log(result);
            this.notifierService.notify("success", "User successfully updated.", "SUCCESS_USER_UPDATE")
            this.getUsers();
        });
    }


    getProgrammes(faculty): any[] {
        let foundFaculty = this.faculties.find((x: any) => x.faculty == faculty);

        return foundFaculty?.programmes;
    }


}
