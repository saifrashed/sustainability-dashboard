import { Component, OnInit } from '@angular/core';
import {AuthenticationService, SurveyService} from "../../../../_services";
import {Survey} from "../../../../_models/survey";
import {Observable} from "rxjs";
import {SurveyResponseService} from "../../../../_services";


@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  public surveyList: any[] = [];

  constructor(private surveyService: SurveyService, private surveyResponse: SurveyResponseService, private authenticationService: AuthenticationService) {

    this.surveyService.findAll().subscribe(surveyList => {
      this.updateSurveyList(surveyList);
    })
  }

  ngOnInit(): void {
    console.log(this.surveyList)
  }


  // checks survey list on completion and adds to survey list array
  updateSurveyList(list: any) {

   for(let ndx = 0; ndx < list.length; ndx++) {
     this.surveyResponse.hasResponded(this.authenticationService.currentUserValue.id, list[ndx].id).subscribe(result => {

       if(result > 0) {
         list[ndx].status = "Completed";
       } else {
         list[ndx].status = "Not Completed";
       }

       this.surveyList.push(list[ndx]);

     })
   }

  }

}
