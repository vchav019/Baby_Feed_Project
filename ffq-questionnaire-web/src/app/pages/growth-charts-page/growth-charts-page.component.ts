import { Component, OnInit } from '@angular/core';
import { BoysLengthAgeBirthTo2Years } from './who/boys/Boys_table_Length_for_age_Birth_to_2_years';


@Component({
  selector: 'app-growth-charts-page',
  templateUrl: './growth-charts-page.component.html',
  styleUrls: ['./growth-charts-page.component.css']
})
export class GrowthChartsPageComponent implements OnInit {

  BoysLengthAgeBirthTo2Years: any[];
  view: any[] = [2100, 900];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Months';
  yAxisLabel: string = 'Length';
  timeline: boolean = true;

  colorScheme = {
    domain: [
       '#547597', '#a63a33', '#ffef9e', '#a1bd80', '#7f4d85',
       '#0c4185', '#ebb92e', '#800f52', '#992e12', '#123b6c',
       '#303030', '#7289da', '#ef4b30', '#fd015c', '#e700fe',
       '#56ff00', '#3eb700', '#2a8600', '#164b00', '#081e00',
       '#800000', '#FF0000', '#FF4500', '#808000', '#556B2F',
       '#2E8B57', '#2F4F4F', '#008B8B', '#1E90FF', '#000080',
       '#4B0082', '#800080', '#778899', '#2F2F4F', '#302B54',
    ]
  };

  constructor() {
    Object.assign(this, { BoysLengthAgeBirthTo2Years });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  //constructor() { }

  ngOnInit(): void {
  }

}
