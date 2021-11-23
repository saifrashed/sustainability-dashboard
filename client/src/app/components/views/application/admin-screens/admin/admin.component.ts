import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService, SurveyResponseService, SurveyService, UserService} from "../../../../../_services";
import {NotifierService} from "angular-notifier";

@Component({
    selector: 'app-dashboard-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public surveyList: any;
    public userList: any;

    public selectedSurveyQuestions: any = [];
    public selectedSurveyId: any;

    public facultyList: any;

    public newUserForm = new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        faculty: new FormControl(''),
        password: new FormControl(''),
        role: new FormControl(['ROLE_FACULTY']),
    });


    // statistics

    public globalStatistics: any;
    public facultyStatistics: any;

    constructor(
        protected surveyService: SurveyService,
        protected authenticationService: AuthenticationService,
        protected userService: UserService,
        protected surveyResponse: SurveyResponseService,
        protected notifierService: NotifierService
    ) {

    }

    ngOnInit(): void {
        this.surveyResponse.getSurveyResponseStatisticsGlobals().subscribe(statistics => {
            this.globalStatistics = statistics;
        });
    }

    getGlobalAverage(pillar: string): number {
        if (this.globalStatistics) {
            let object = this.globalStatistics.find((x: any) => x._id == pillar);

            if (object == undefined) {
                return 0;
            }

            return object.average.toFixed(1);
        } else {
            return 0;
        }
    }

}
