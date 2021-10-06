import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],
})

export class CarouselComponent implements OnInit{

  @Input() slides = [
    {src: "https://image1.com"},
    {src: "https://image2.com"},
    {src: "https://image3.com"},
    {src: "https://image4.com"}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
