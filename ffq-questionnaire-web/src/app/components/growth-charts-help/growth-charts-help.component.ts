import { Component, OnInit } from "@angular/core";

export interface PeriodicElement {
  position: number;
  from: string;
  to: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, from: "1 Inch (in)", to: "2.54 Centimeters (cm)" },
  { position: 2, from: "2.204623 Pounds (lb)", to: "1 Kilogram (kg)" },
];

@Component({
  selector: "app-growth-charts-help",
  templateUrl: "./growth-charts-help.component.html",
  styleUrls: ["./growth-charts-help.component.css"],
})
export class GrowthChartsHelpComponent implements OnInit {
  displayedColumns: string[] = ["position", "from", "to"];
  dataSource = ELEMENT_DATA;
  constructor() {}

  ngOnInit(): void {}
}
