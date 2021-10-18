export class Survey {
    id: string;
    title: string;
    pillar: string;
    scoringDescription: string[];


    constructor(id: string, title: string, pillar: string, scoringDescription: string[]) {
        this.id = id;
        this.title = title;
        this.pillar = pillar;
        this.scoringDescription = scoringDescription;
    }
}
