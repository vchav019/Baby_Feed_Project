import { JsonPipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormsModule, NgForm, FormControl } from "@angular/forms";
import { hexToRgb, PolarChartComponent } from "@swimlane/ngx-charts";
import { stat } from "fs";

import { ParentService } from "src/app/services/parent/parent-service";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { ActivatedRoute } from "@angular/router";
import { FFQParentResponse } from "src/app/models/ffqparent-response";
import { Observable } from "rxjs";
import { min } from "rxjs/operators";

//The information needed to plot the charts are imported from the following directory: assets/growth-charts-data/who

//boys

//bmi
import { BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS } from "../../../assets/growth-charts-data/who/boys/bmi/boys_bmi_for_age_birth_to_two_years";

//height - age
import { BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS } from "../../../assets/growth-charts-data/who/boys/height - age/boys_length_for_age_birth_to_two_years";

//weight - age
import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS } from "../../../assets/growth-charts-data/who/boys/weight - age/boys_weight_for_age_birth_to_two_years";

//weight - height
import { BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS } from "../../../assets/growth-charts-data/who/boys/weight - height/boys_weight_for_length_birth_to_two_years";

//girls

//bmi
import { GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS } from "../../../assets/growth-charts-data/who/girls/bmi/girls_bmi_for_age_birth_to_two_years";

//height - age
import { GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS } from "../../../assets/growth-charts-data/who/girls/height - age/girls_length_for_age_birth_to_two_years";

//weight - age
import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS } from "../../../assets/growth-charts-data/who/girls/weight - age/girls_weight_for_age_birth_to_two_years";

//weight - height
import { GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS } from "../../../assets/growth-charts-data/who/girls/weight - height/girls_weight_for_length_birth_to_two_years";
import { parse } from "path";

class ChildData {
  age: string;
  weight: string;
  height: string;

  constructor(age: string, weight: string, height: string) {
    this.age = age;
    this.weight = weight;
    this.height = height;
  }
}

class Child {
  childName: string;
  childGender: string;
  weightLengthDataByMonth: ChildData[] = [];

  constructor(childName: string, gender: string) {
    this.childName = childName;
    this.childGender = gender;
  }

  addData(childData: ChildData): void {
    let filteredData = this.weightLengthDataByMonth.find(
      (x) => x.age === childData.age
    );

    if (filteredData === undefined) {
      this.weightLengthDataByMonth.push(childData);
      this.weightLengthDataByMonth.sort(function (a, b) {
        if (a.age === b.age) return 0;
        return parseInt(a.age) < parseInt(b.age) ? -1 : 1;
      });
    } else {
      filteredData.height = childData.height;
      filteredData.weight = childData.weight;
    }
  }

  getHeightChartData(): any {
    let heightbyMonth: { name: string; value: string }[] = [];
    for (let data of this.weightLengthDataByMonth) {
      heightbyMonth.push({ name: data.age, value: data.height });
    }
    return { name: this.childName, series: heightbyMonth };
  }

  getWeightChartData(): any {
    let weightbyMonth: { name: string; value: string }[] = [];
    for (let data of this.weightLengthDataByMonth) {
      weightbyMonth.push({ name: data.age, value: data.weight });
    }
    return { name: this.childName, series: weightbyMonth };
  }

  getBMIChartData(): any {
    let weightbyMonth: { name: string; value: string }[] = [];
    for (let data of this.weightLengthDataByMonth) {
      weightbyMonth.push({
        name: data.age,
        value: this.getBMI(data.weight, data.height),
      });
    }
    return { name: this.childName, series: weightbyMonth };
  }

  getBMI(weight: string, height: string): string {
    return (
      parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)
    ).toString();
  }
}

@Component({
  selector: "app-growth-charts-page",
  templateUrl: "./growth-charts-page.component.html",
  styleUrls: ["./growth-charts-page.component.css"],
})
export class GrowthChartsPageComponent implements OnInit {
  //who

  //boys
  //bmi
  BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS: any[];

  //height - age
  BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS: any[];

  //weight - age
  BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS: any[];

  //weight - height
  BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS: any[];

  //girls

  //bmi
  GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS: any[];

  //height - age
  GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS: any[];

  //weight - age
  GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS: any[];

  //weight - height
  GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS: any[];

  // constant to validate the forms
  readonly MAX_AGE_MONTHS = 24;
  readonly MIN_AGE_MONTHS = 0;
  readonly MAX_HEIGHT_CENTIMETERS = 140;
  readonly MIN_HEIGHT_CENTIMETERS = 0;
  readonly MAX_WEIGHT_KILOGRAMS = 100;
  readonly MIN_WEIGHT_KILOGRAMS = 0;

  // currentParent
  public currentParent: FFQParentResponse = new FFQParentResponse(
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    [],
    false,
    "",
    "",
    0,
    []
  );

  // child data
  childName: string = "";
  childHeight: string = "";
  childWeight: string = "";
  childAge: string = "";
  childGender: string = "";
  currentChild: Child = {} as Child;
  childList: Child[] = [];

  // charts options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "";
  yAxisLabel: string = "";
  timeline: boolean = true;
  view: any[] = [1400, 1400];
  results: any[] = [];
  position: string = "right";
  chartChoseOption?: string = "none";

  // colors used to plot the diferent graphs
  colorScheme = {
    domain: [
      "#547597",
      "#a63a33",
      "#ffef9e",
      "#a1bd80",
      "#7f4d85",
      "#0c4185",
      "#ebb92e",
      "#800f52",
      "#992e12",
      "#123b6c",
      "#303030",
      "#7289da",
      "#ef4b30",
      "#fd015c",
      "#e700fe",
      "#56ff00",
      "#3eb700",
      "#2a8600",
      "#164b00",
      "#081e00",
      "#800000",
      "#FF0000",
      "#FF4500",
      "#808000",
      "#556B2F",
      "#2E8B57",
      "#2F4F4F",
      "#008B8B",
      "#1E90FF",
      "#000080",
      "#4B0082",
      "#800080",
      "#778899",
      "#2F2F4F",
      "#302B54",
    ],
  };

  // @ViewChild('ageWeightHeightForm') childBodyMeasurementsForm: NgForm;

  constructor(
    private parentService: ParentService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {
    Object.assign(this, {
      BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS,
      BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS,
      BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS,
      BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS,
      GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS,
      GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS,
      GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS,
      GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS,
    });
  }

  onSubmitChildPersonalInformationForm() {
    console.log("Working in progress submitting child personal information");
  }

  onSubmitChildBodyMeasurementsForm() {
    console.log("Working in progress submitting child body measurements");
  }

  onSubmitChartOptionsForm() {
    console.log("Working in progress submitting chart options");
  }

  onAddingData() {
    console.log("working in progress adding data");
    /*
    console.log(
      BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS[0].name,
      BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS[0].series
    );
    */

    let filteredData = this.childList.find(
      (x) => x.childName === this.childName
    );
    if (filteredData.childGender === "genderNotProvided")
      filteredData.childGender = this.childGender;

    this.currentChild.addData(
      new ChildData(this.childAge, this.childWeight, this.childHeight)
    );

    this.results.push(this.currentChild.getHeightChartData());

    console.log(this.results);
    this.results = [...this.results];
  }

  // the event is triggered when the type of chart is changed
  onTypeChartChange(typeOfChart: string) {
    console.log(this.chartChoseOption);
    switch (typeOfChart) {
      case "BMI": {
        this.results = this.getMBIChart(this.childGender);
        if (this.childGender === "male") {
          this.yAxisLabel = "Male BMI";
        } else if (this.childGender === "female")
          this.yAxisLabel = "Female BMI";
        this.xAxisLabel = "Age (month)";
        break;
      }
      case "Height-Age": {
        this.results = this.getHeightAgeChart(this.childGender);
        if (this.childGender === "male") {
          this.yAxisLabel = "Male Height (cm)";
        } else if (this.childGender === "female")
          this.yAxisLabel = "Female Height (cm)";
        this.xAxisLabel = "Age (month)";
        break;
      }
      case "Weight-Age": {
        this.results = this.getWeightAgeChart(this.childGender);
        if (this.childGender === "male") {
          this.yAxisLabel = "Male Height (cm)";
        } else if (this.childGender === "female")
          this.yAxisLabel = "Female Height (cm)";
        this.xAxisLabel = "Age (month)";
        break;
      }
      case "Weight-Height": {
        this.results = this.getWeightHeightChart(this.childGender);
        if (this.childGender === "male") {
          this.yAxisLabel = "Male Weight (cm)";
          this.xAxisLabel = "Male Height (cm)";
        } else if (this.childGender === "female") {
          this.yAxisLabel = "Female Height (cm)";
          this.xAxisLabel = "Female Height (cm)";
        }
        break;
      }
    }
  }

  onSelect(data): void {
    //console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    const parent: Observable<FFQParentResponse> = this.parentService.getParent(
      this.authenticationService.currentUserId
    );
    parent.subscribe((a) => {
      this.currentParent = a;
    });
    for (let name of this.currentParent.childrennames)
      this.childList.push(new Child(name, "genderNotProvided"));
  }

  // get the correct data for MBI charts depending on gender
  getMBIChart(childGender: string): any[] {
    console.log("Choosing charts by gender: ", childGender);
    if (childGender === "male") {
      return BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS;
    } else if (childGender === "female")
      return GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS;
  }
  // get the correct data for MBI charts depending on gender
  getHeightAgeChart(childGender: string): any[] {
    console.log("Choosing charts by gender: ", childGender);

    if (childGender === "male") {
      return BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS;
    } else if (childGender === "female")
      return GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS;
  }

  // get the correct data for MBI charts depending on gender
  getWeightAgeChart(childGender: string): any[] {
    console.log("Choosing charts by gender: ", childGender);

    if (childGender === "male") {
      return BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS;
    } else if (childGender === "female")
      return GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS;
  }

  // get the correct data for MBI charts depending on gender.
  // The data for WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS for male and female has to many points to plot. So, to obtain more pleasant
  // visual effects will be trimmed to a maximum 24 points (MAX_RANGE_MONTHS) where the avg of the values of the child will be the media of the graph
  getWeightHeightChart(childGender: string): any[] {
    console.log("Choosing charts by gender: ", childGender);

    if (childGender === "male") {
      return this.trimChartData(
        this.childHeight,
        this.MAX_AGE_MONTHS,
        BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS
      );
    } else if (childGender === "female") {
      return this.trimChartData(
        this.childHeight,
        this.MAX_AGE_MONTHS,
        GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS
      );
    }
  }

  // Find an optimal interval where pointX is centered and the range is total number of point in the interval
  trimChartData(pointX: string, range: number, chartData: any[]) {
    let index = this.getIndex(
      pointX,
      chartData[0].series,
      0,
      chartData[0].series.length - 1
    );

    let suitableIndexLeft = index - range;
    let suitableIndexRight = index + range;

    console.log(suitableIndexLeft);

    while (suitableIndexLeft < 0) {
      suitableIndexLeft++;
    }

    while (suitableIndexRight >= chartData[0].series.length) {
      suitableIndexRight--;
    }

    let left = suitableIndexLeft;
    let min = Number.MAX_VALUE;

    do {
      if (
        Math.abs(index - suitableIndexLeft - (suitableIndexRight - index)) < min
      ) {
        left = suitableIndexLeft;
        suitableIndexRight = index + range - (index - left);
        min = Math.abs(
          index - suitableIndexLeft - (suitableIndexRight - index)
        );
      }
      suitableIndexLeft++;
    } while (
      suitableIndexLeft < index &&
      suitableIndexLeft + range - 1 < chartData[0].series.length
    );

    let startIndex = left;
    let ChartDataInRange: any[] = [];

    for (let percentile of chartData) {
      let chartDataSeries: any[] = [];
      for (let j = startIndex; j < startIndex + range; j++) {
        chartDataSeries.push(percentile.series[j]);
      }
      ChartDataInRange.push({ name: percentile.name, series: chartDataSeries });
    }
    return ChartDataInRange;
  }

  getIndex(
    pointX: string,
    dataChart: any[],
    startIndex: number,
    endIndex: number
  ) {
    if (endIndex >= startIndex) {
      let middleIndex = Math.floor((startIndex + endIndex) / 2);
      if (
        parseFloat(dataChart[middleIndex].name) === parseFloat(pointX) ||
        endIndex == startIndex
      )
        return middleIndex;

      if (parseFloat(dataChart[middleIndex].name) > parseFloat(pointX))
        return this.getIndex(pointX, dataChart, startIndex, middleIndex - 1);

      return this.getIndex(pointX, dataChart, middleIndex + 1, endIndex);
    }
    if (parseFloat(pointX) < parseFloat(dataChart[0].name)) return 0;
    if (parseFloat(pointX) > parseFloat(dataChart[dataChart.length - 1].name))
      return dataChart.length - 1;
  }
}
