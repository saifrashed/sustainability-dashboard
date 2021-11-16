export class Survey {
    id: any;
    title: string;
    pillar: string;
    scoringDescription: string[];

    constructor(id: any, title: string, pillar: string, scoringDescription: string[]) {
        this.id = id;
        this.title = title;
        this.pillar = pillar;
        this.scoringDescription = scoringDescription;
    }
}
