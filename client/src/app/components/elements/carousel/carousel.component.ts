import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],
})

export class CarouselComponent implements OnInit{

  @Input() slides = [
    {src: "https://www.inqdo.com/wp-content/uploads/2020/05/HvA-gecentreerd-transparant.jpg"},
    {src: "https://media.nu.nl/m/ujxx44ya52jq_xwd640.jpg/hva-en-uva-melden-cyberaanval-onderwijs-gaat-gewoon-door.jpg"},
    {src: "https://www.hva.nl/binaries/threeColumnLandscape/content/gallery/hva/over-de-hva/werken-bij-de-hva/werken-bij-de-hva.jpg"},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
