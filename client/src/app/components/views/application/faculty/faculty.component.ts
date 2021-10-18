import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../../../_services";
import {Survey} from "../../../../_models/survey";
import {Observable} from "rxjs";


@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  public surveyList: any;

  constructor(private surveyService: SurveyService) {

    this.surveyService.findAll().subscribe(surveyList => {
      this.surveyList = surveyList;
    })

  }

  ngOnInit(): void {
    console.log(this.surveyList)
  }

}
