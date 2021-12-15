import {Component, OnInit} from '@angular/core';

import {AdminComponent} from "../admin/admin.component";
import {EChartsOption} from "echarts/types/dist/echarts";

@Component({
    selector: 'app-admin-statistic',
    templateUrl: './admin-statistic.component.html',
    styleUrls: ['../admin/admin.component.css']
})

export class AdminStatisticComponent extends AdminComponent implements OnInit {

    facultyData: any[] = [];
    programmeData: any[] = [];

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


    /**
     * Chart arrow function returning options for faculty chart
     * @param data
     */
    chartOptionFaculty = (data: any): EChartsOption => {
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
    };


    /**
     * Chart arrow function returning options for faculty chart
     * @param data
     */
    chartOptionProgramme = (): EChartsOption => {
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {name: 'Business operations/Facilities', value: 3},
                        {name: 'Education', value: 3.392857142857143}
                    ]
                }
            ]
        };
    };

    ngOnInit(): void {
        super.ngOnInit();

        console.log("init");

        this.getFormattedFacultyData();
        this.getGlobalsAcrossTime();

    }


    getFormattedFacultyData() {
        // Get faculties and format chart data
        this.surveyResponse.findAllFaculties().subscribe(faculties => {

            faculties.forEach(faculty => {

                this.surveyResponse.getSurveyResponseStatisticsByFaculty(faculty._id).subscribe(data => {

                    let formattedData: any[] = [];

                    data.forEach(dataPoint => {
                        formattedData.push({
                            name: dataPoint._id,
                            value: dataPoint.average
                        })
                    });

                    if (faculty._id != undefined) {
                        this.facultyData.push(
                            {
                                facultyName: faculty._id,
                                data: formattedData
                            })
                    }

                    // sort the array
                    this.facultyData.sort(
                        function (a, b) {
                            if (a.facultyName < b.facultyName) {
                                return -1;
                            }
                            if (a.facultyName > b.facultyName) {
                                return 1;
                            }
                            return 0;
                        });
                })
            });
        });

    }

    getGlobalsAcrossTime() {
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

    getFacultyChartData(faculty: string): any[] {
        let object = this.facultyData?.find((x: any) => x.facultyName == faculty);
        return object?.data || [];
    }

    selectFaculty(faculty: string) {
        this.surveyResponse.findAllProgrammes(faculty).subscribe(result => {
            this.programmeData = result;
        })
    }

}
