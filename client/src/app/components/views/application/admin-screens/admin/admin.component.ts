import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService, SurveyResponseService, SurveyService} from "../../../../../_services";
import {Survey} from "../../../../../_models/survey";
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

    public newSurveyForm = new FormGroup({
        title: new FormControl(''),
        pillar: new FormControl(''),
        optionZero: new FormControl('Bad'),
        optionOne: new FormControl('Below average'),
        optionTwo: new FormControl('Average'),
        optionThree: new FormControl('Above average'),
        optionFour: new FormControl('Good'),
        optionFive: new FormControl('Excellent'),
    });


    public newQuestionForm = new FormGroup({
        description: new FormControl(''),
        weight: new FormControl(1),
    });


    // statistics

    public globalStatistics: any;
    public facultyStatistics: any;
    chartOption: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Januari', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        yAxis: {
            type: 'value',
            name: 'Survey Averages',
            min: 0,
            max: 100,
            position: 'left'
        },
        series: [
            {
                name: 'X-1',
                type: 'line',
                data: [2, 5, 12, 23, 25, 29, 45]
            },
            {
                name: 'X-2',
                type: 'line',
                data: [6, 3, 20, 44, 53, 34, 44]
            },
            {
                name: 'X-3',
                type: 'line',
                data: [15, 15, 39, 66, 76, 82, 70]
            },
            {
                name: 'X-4',
                type: 'line',
                data: [1, 6, 15, 32, 31, 53, 30]
            }]
    };

    constructor(
        private surveyService: SurveyService,
        private authenticationService: AuthenticationService,
        private surveyResponse: SurveyResponseService,
        private notifierService: NotifierService
    ) {

        this.surveyService.findAll().subscribe(surveyList => {
            this.surveyList = surveyList;
            this.getCompletedSurveys();
        });

        this.authenticationService.findAll().subscribe(userList => {
            this.userList = userList;
        });

        this.surveyResponse.findAllFaculties().subscribe(faculties => {
            this.facultyList = faculties;
        });

        this.surveyResponse.getSurveyResponseStatisticsGlobals().subscribe(statistics => {
            this.globalStatistics = statistics;
        });
    }

    ngOnInit(): void {

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
                this.notifierService.notify("success", "User successfully deleted. ", "SUCCESS_USERDELETE")
            })
        } else {
            this.notifierService.notify("error", "User not deleted. ", "FAIL_USERDELETE")
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

    reopenSurvey() {
        this.notifierService.notify("warning", "Do you want to reopen te survey?", 'SURVEY_RESPONSE_ERROR')
    }

    // Survey CRUD
    getSurveys() {
        this.surveyService.findAll().subscribe(surveyList => {
            this.surveyList = surveyList;
            this.getCompletedSurveys();
        });
    }

    getCompletedSurveys() {
        for (let index in this.surveyList) {
            this.surveyResponse.getCompletedSurveys(this.surveyList[index].id).subscribe(result => {
                this.surveyList[index].completed = result;
            });
        }
    }

    getSurveyQuestions(id: string) {
        this.surveyService.findAllQuestions(id).subscribe(surveyQuestions => {
            this.selectedSurveyQuestions = surveyQuestions;
            this.selectedSurveyId = id;
        })
    }

    addSurvey() {

        let surveyObject: Survey = {
            id: null,
            title: this.newSurveyForm.controls["title"].value,
            pillar: this.newSurveyForm.controls["pillar"].value,
            scoringDescription: [
                this.newSurveyForm.controls["optionZero"].value,
                this.newSurveyForm.controls["optionOne"].value,
                this.newSurveyForm.controls["optionTwo"].value,
                this.newSurveyForm.controls["optionThree"].value,
                this.newSurveyForm.controls["optionFour"].value,
                this.newSurveyForm.controls["optionFive"].value
            ]
        };


        this.surveyService.create(surveyObject).subscribe(message => {
            this.getSurveys();
            this.newSurveyForm.reset();
            this.newSurveyForm.controls["optionZero"].setValue("Bad");
            this.newSurveyForm.controls["optionOne"].setValue("Below average");
            this.newSurveyForm.controls["optionTwo"].setValue("Average");
            this.newSurveyForm.controls["optionThree"].setValue("Above average");
            this.newSurveyForm.controls["optionFour"].setValue("Good");
            this.newSurveyForm.controls["optionFive"].setValue("Excellent");
        });
    }

    // SurveyResponse model

    addSurveyQuestion() {

        if (!this.newQuestionForm.controls["description"].value || !this.newQuestionForm.controls["weight"].value) {
            this.notifierService.notify("error", "Fill in all fields", 'SURVEY_ADD_ERROR');
            return;
        }

        let questionObject = {
            id: null,
            surveyId: this.selectedSurveyId,
            description: this.newQuestionForm.controls["description"].value,
            weight: this.newQuestionForm.controls["weight"].value,
        };

        this.surveyService.createQuestion(questionObject).subscribe(message => {
            this.getSurveyQuestions(this.selectedSurveyId);
            this.newQuestionForm.reset();
            this.newQuestionForm.controls["weight"].setValue(1);
            this.notifierService.notify("success", "Question has been added to the survey", "ADD_SURVEY_QUESTION")
        })
    }

    getFaculties() {
        this.surveyResponse.findAllFaculties().subscribe(faculties => {
            this.facultyList = faculties;
        })
    }

    getFacultyAverages(faculty: string) {
        this.surveyResponse.getSurveyResponseStatisticsByFaculty(faculty).subscribe(statistics => {
            this.facultyStatistics = statistics;
        })
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

    getFacultyAverage(pillar: string): number {
        if (this.facultyStatistics) {
            let object = this.facultyStatistics.find((x: any) => x._id == pillar);

            if (object == undefined) {
                return 0;
            }

            return object.average.toFixed(1);
        } else {
            return 0;
        }
    }
}