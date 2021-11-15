import {Component, OnInit} from '@angular/core';
import {AuthenticationService, SurveyResponseService, SurveyService} from "../../../../_services";


@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  private _surveyList: any[] = [];
  public surveyAverage: any;

  constructor(private _surveyService: SurveyService, private _surveyResponse: SurveyResponseService, private _authenticationService: AuthenticationService) {

    this._surveyService.findAll().subscribe(surveyList => {
      this.actualiseSurveyList(surveyList);
    })

    this._surveyResponse.getSurveyResponseStatisticsByFaculty(this._authenticationService.currentUserValue.faculty).subscribe(value => {
      this.surveyAverage = value
    })
  }

  // calculates average for each faculty
  getAverageByFaculty(faculty: any): number {
    for (let i = 0; i < this.surveyAverage?.length; i++) {
      if (faculty == this.surveyAverage[i]._id){
        return (parseInt(this.surveyAverage[i].average) * 2) * 10
      }
    }
    return 0
  }

  get surveyList(): any[] {
    return this._surveyList;
  }

  ngOnInit(): void {
  }

  // checks survey list on completion and adds to survey list array
  actualiseSurveyList(list: any) {

    for (let ndx = 0; ndx < list.length; ndx++) {
      this._surveyResponse.hasResponded(this._authenticationService.currentUserValue.id, list[ndx].id).subscribe(result => {

        if (result > 0) {
          list[ndx].status = "Completed";
        } else {
          list[ndx].status = "Not Completed"
        }

        this._surveyList.push(list[ndx]);

        this._surveyList.sort(((a: any, b: any) => {
          if (new Date(parseInt(a.id.substring(0, 8), 16) * 1000) < new Date(parseInt(b.id.substring(0, 8), 16) * 1000)) {
            return -1;
          }
          if (new Date(parseInt(a.id.substring(0, 8), 16) * 1000) > new Date(parseInt(b.id.substring(0, 8), 16) * 1000)) {
            return 1;
          }
          return 0;
        }))

      })
    }

  }

}
