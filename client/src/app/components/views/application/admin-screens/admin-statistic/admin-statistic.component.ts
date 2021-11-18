import {Component, OnInit} from '@angular/core';

import {AdminComponent} from "../admin/admin.component";
import {EChartsOption} from "echarts/types/dist/echarts";

@Component({
    selector: 'app-admin-statistic',
    templateUrl: './admin-statistic.component.html',
    styleUrls: ['../admin/admin.component.css']
})

export class AdminStatisticComponent extends AdminComponent implements OnInit {

    researchData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    educationData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    businessData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    organisationData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
        legend: {
            show: true
        },
        series: [
            {
                name: 'Research',
                type: 'line',
                data: this.researchData
            },
            {
                name: 'Education',
                type: 'line',
                data: this.educationData
            },
            {
                name: 'Business operations/Facilities',
                type: 'line',
                data: this.businessData
            },
            {
                name: 'Organisation',
                type: 'line',
                data: this.organisationData
            }
        ]
    };


    ngOnInit(): void {
        super.ngOnInit();

        this.surveyResponse.findAllFaculties().subscribe(faculties => {
            this.facultyList = faculties;
        });

        this.surveyResponse.getSurveyResponseStatisticsGlobalsAcrossTime().subscribe(result => {
            result.forEach(element => {
                if (element?.pillar == "Education") {
                    this.educationData[element.month - 1] = element.average
                }

                if (element?.pillar == "Research") {
                    this.researchData[element.month - 1] = element.average
                }

                if (element?.pillar == "Business operations/Facilities") {
                    this.businessData[element.month - 1] = element.average
                }

                if (element?.pillar == "Organisation") {
                    this.organisationData[element.month - 1] = element.average
                }
            })

        })

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
