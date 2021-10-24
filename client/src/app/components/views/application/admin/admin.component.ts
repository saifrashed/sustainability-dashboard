import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthenticationService, SurveyResponseService, SurveyService} from "../../../../_services";
import {Survey} from "../../../../_models/survey";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public surveyList: any;
  public selectedSurveyQuestions: any = [];
  public selectedSurveyId: any;
  public userList: any;

  public facultyList: any;
  public facultyListCounter: number = 0;

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

  constructor(private surveyService: SurveyService, private authenticationService: AuthenticationService, private surveyResponse: SurveyResponseService) {
    this.surveyService.findAll().subscribe(surveyList => {
      this.surveyList = surveyList;
    });

    this.authenticationService.findAll().subscribe(userList => {
      this.userList = userList;
    });

    this.surveyResponse.findAllFaculties().subscribe(faculties => {
      this.facultyList = faculties;
    })
  }

  ngOnInit(): void {
  }


  // User CRUD
  getUsers() {
    this.authenticationService.findAll().subscribe(userList => {
      this.userList = userList;
    })
  }

  deleteUser(id: string) {
    this.authenticationService.deleteById(id).subscribe(message => {

      console.log(message);
      this.getUsers();
    });
  }

  addUser() {
    this.authenticationService.create(this.newUserForm.getRawValue()).subscribe(message => {

      console.log(message);
      this.getUsers();

      this.newUserForm.reset();
    })
  }


  // Survey CRUD
  getSurveys() {
    this.surveyService.findAll().subscribe(surveyList => {
      this.surveyList = surveyList;
    });
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
      console.log(message);

      this.getSurveys();
      this.newSurveyForm.reset();
    });
  }


  addSurveyQuestion() {

    let questionObject = {
      id: null,
      surveyId: this.selectedSurveyId,
      description: this.newQuestionForm.controls["description"].value,
      weight: this.newQuestionForm.controls["weight"].value,
    };

    console.log(questionObject);

    this.surveyService.createQuestion(questionObject).subscribe(message => {

      console.log(message);

      this.getSurveyQuestions(this.selectedSurveyId);
      this.newQuestionForm.reset();
    })

  }


  // SurveyResponse model

  getFaculties() {
    this.surveyResponse.findAllFaculties().subscribe(faculties => {
      this.facultyList = faculties;
    })
  }





}
