import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService, SurveyResponseService, SurveyService} from "../../../../_services";
import {Survey} from "../../../../_models/survey";
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

  public newSurveyForm = new FormGroup({
    title: new FormControl(''),
    pillar: new FormControl(''),
    optionOne: new FormControl('Bad'),
    optionTwo: new FormControl('Below average'),
    optionThree: new FormControl('Average'),
    optionFour: new FormControl('Above average'),
    optionFive: new FormControl('Good'),
  });


  public newQuestionForm = new FormGroup({
    description: new FormControl(''),
    weight: new FormControl(1),
  });


  // statistics

  public globalStatistics: any;
  public facultyStatistics: any;

  constructor(
    private surveyService: SurveyService,
    private authenticationService: AuthenticationService,
    private surveyResponse: SurveyResponseService,
    private notifierService: NotifierService
  ) {

    this.surveyService.findAll().subscribe(surveyList => {
      this.surveyList = surveyList;
      this.getCompletedSurveys();

        //
        this.notifierService.notify("success", "All surveys have been loaded", "GET_SURVEY_SUCCESS")
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
      this.notifierService.notify("success", "Welcome to the Dashboard " + this.authenticationService.currentUserValue.username, "WELCOME_MESSAGE")
  }



  // User CRUD
  getUsers() {
    this.authenticationService.findAll().subscribe(userList => {
      this.userList = userList;
    })
  }

  deleteUser(id: string) {
    this.authenticationService.deleteById(id).subscribe(message => {
      this.getUsers();
    });
  }

  addUser() {
    this.authenticationService.create(this.newUserForm.getRawValue()).subscribe(message => {
      this.getUsers();
      this.newUserForm.reset();
    })
  }

  responsesFilledError() {
    this.notifierService.notify("error", "Cannot edit questions because of filled responses", 'SURVEY_RESPONSE_ERROR')
  }

  // Survey CRUD
  getSurveys() {
    this.surveyService.findAll().subscribe(surveyList => {
      this.surveyList = surveyList;
      this.notifierService.notify("success", "All surveys have been loaded", "GET_SURVEY_SUCCESS")
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
      this.newSurveyForm.controls["optionOne"].setValue("Bad");
      this.newSurveyForm.controls["optionTwo"].setValue("Below average");
      this.newSurveyForm.controls["optionThree"].setValue("Average");
      this.newSurveyForm.controls["optionFour"].setValue("Above average");
      this.newSurveyForm.controls["optionFive"].setValue("Good");
    });
  }


  addSurveyQuestion() {
    let questionObject = {
      id: null,
      surveyId: this.selectedSurveyId,
      description: this.newQuestionForm.controls["description"].value,
      weight: this.newQuestionForm.controls["weight"].value,
    };

    this.surveyService.createQuestion(questionObject).subscribe(message => {
      this.getSurveyQuestions(this.selectedSurveyId);
      this.newQuestionForm.reset();
      this.newQuestionForm.controls["weight"].setValue(1)
    })
  }


  // SurveyResponse model

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
