import {Component, OnInit} from '@angular/core';
import {AuthenticationService, SurveyResponseService, SurveyService} from "../../../../_services";


@Component({
    selector: 'app-faculty',
    templateUrl: './faculty.component.html',
    styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

    public surveyList: any[] = [];

    constructor(private surveyService: SurveyService, private surveyResponse: SurveyResponseService, private authenticationService: AuthenticationService) {

        this.surveyService.findAll().subscribe(surveyList => {
            this.actualiseSurveyList(surveyList);
        })
    }

    ngOnInit(): void {
        console.log(this.surveyList)
    }


    // checks survey list on completion and adds to survey list array
    actualiseSurveyList(list: any) {

        for (let ndx = 0; ndx < list.length; ndx++) {
            this.surveyResponse.hasResponded(this.authenticationService.currentUserValue.id, list[ndx].id).subscribe(result => {

                if (result > 0) {
                    list[ndx].status = "Completed";
                } else {
                    list[ndx].status = "Not Completed";
                }

                this.surveyList.push(list[ndx]);

                this.surveyList.sort(((a: any, b: any) => {
                  if ( new Date(parseInt(a.id.substring(0, 8), 16) * 1000) < new Date(parseInt(b.id.substring(0, 8), 16) * 1000) ){
                    return -1;
                  }
                    if ( new Date(parseInt(a.id.substring(0, 8), 16) * 1000) > new Date(parseInt(b.id.substring(0, 8), 16) * 1000) ){
                    return 1;
                  }
                  return 0;
                }))

            })
        }

    }

}
