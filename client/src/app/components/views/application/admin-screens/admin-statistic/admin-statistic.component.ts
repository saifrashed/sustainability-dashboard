import {Component, OnInit} from '@angular/core';

import {AdminComponent} from "../admin/admin.component";

@Component({
    selector: 'app-admin-statistic',
    templateUrl: './admin-statistic.component.html',
    styleUrls: ['../admin/admin.component.css']
})

export class AdminStatisticComponent extends AdminComponent implements OnInit {

    ngOnInit(): void {
        super.ngOnInit();

        this.surveyResponse.findAllFaculties().subscribe(faculties => {
            this.facultyList = faculties;
        });

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
}
