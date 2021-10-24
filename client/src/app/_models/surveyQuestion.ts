export class SurveyQuestion {
    id: any;
    surveyId: string;
    description: string;
    weight: number;


    constructor(id: any, surveyId: string, description: string, weight: number) {
        this.id = id;
        this.surveyId = surveyId;
        this.description = description;
        this.weight = weight;
    }
}
