import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService, SurveyResponseService, SurveyService} from "../../../../../_services";
import {NotifierService} from "angular-notifier";
import {EChartsOption} from 'echarts';

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
    chartOption: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        yAxis: {
            type: 'value',
            name: 'Survey Averages',
            min: 0,
            max: 5,
            position: 'left'
        },
        series: [
            {
                name: 'X-1',
                type: 'line',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4.5, 0, 0]
            },
            {
                name: 'X-2',
                type: 'line',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0]
            },
            {
                name: 'X-3',
                type: 'line',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0]
            },
            {
                name: 'X-4',
                type: 'line',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2.3, 0, 0]
            }]
    };

    constructor(
        protected surveyService: SurveyService,
        protected authenticationService: AuthenticationService,
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
