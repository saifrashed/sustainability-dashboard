import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthenticationService, SurveyService} from "../../../../_services";
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

  constructor(private surveyService: SurveyService, private authenticationService: AuthenticationService) {
    this.surveyService.findAll().subscribe(surveyList => {
      this.surveyList = surveyList;
    });

    this.authenticationService.findAll().subscribe(userList => {
      this.userList = userList;
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






}
