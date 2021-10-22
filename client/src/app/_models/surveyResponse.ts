export class SurveyResponse {
    id: any;
    userId: string;
    surveyId: string;
    scoring: object[];


    constructor(id: any, userId: string, surveyId: string, scoring: object[]) {
        this.id = id;
        this.userId = userId;
        this.surveyId = surveyId;
        this.scoring = scoring;
    }
}
