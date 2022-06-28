import { JsonPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm, FormControl } from "@angular/forms";
import { hexToRgb, PolarChartComponent } from "@swimlane/ngx-charts";

import { ParentService } from "src/app/services/parent/parent-service";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { ActivatedRoute } from "@angular/router";
import { FFQParentResponse } from "src/app/models/ffqparent-response";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

//The information needed to plot the charts are imported from the following directory: assets/growth-charts-data/who

//boys/bmi

//bmi
import { BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/bmi/BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//boys/metric system

//height - age
import { BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/height - age/BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - age
import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/weight - age/BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - height
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/weight - height/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//girls/bmi

//bmi
import { GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/bmi/GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//girls/metric system

//height - age
import { GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/height - age/GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - age
import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/weight - age/GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - height
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/weight - height/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//boys/us customary system

//height - age
import { BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/height - age/BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - age
import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/weight - age/BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - height
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/weight - height/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//girls/us customary system

//height - age
import { GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/height - age/GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - age
import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/weight - age/GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - height
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/weight - height/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//mixed
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN } from "src/assets/growth-charts-data/who/boys/mixed/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN";
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM } from "src/assets/growth-charts-data/who/boys/mixed/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM";
//import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN } from "src/assets/growth-charts-data/who/boys/mixed/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN";

import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM } from "src/assets/growth-charts-data/who/girls/mixed/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM";
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN } from "src/assets/growth-charts-data/who/girls/mixed/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN";
//import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN } from "src/assets/growth-charts-data/who/girls/mixed/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN";

class ChildData {
  age: string;
  weight: number;
  height: number;

  constructor(age: string, weight: number, height: number) {
    this.age = age;
    this.weight = weight;
    this.height = height;
  }
}

enum UnitsOfMeasurement {
  in = "in",
  cm = "cm",
  lb = "lb",
  kg = "kg",
}

enum Gender {
  Male = "Male",
  Female = "Female",
  NotAssigned = "",
}

enum ChartOption {
  BMI = "BMI",
  HeightAge = "Height-Age",
  WeightAge = "Weight-Age",
  WeightHeight = "Weight-Height",
  NotAssigned = "none",
}

enum GrowthChartData {
  BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM = "BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM",
  BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM = "BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM",
  BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM = "BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM",
  BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM = "BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM",
  BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM = "BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM",
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM = "BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM",
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM = "BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM",
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN = "BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN",
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM = "BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM",
  //BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN = "BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN",
  GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM = "GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM",
  GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM = "GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM",
  GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM = "GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM",
  GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM = "GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM",
  GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM = "GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM",
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM = "GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM",
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM = "GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM",
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN = "GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN",
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM = "GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM",
  //GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN = "GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN",
  NONE = "none",
}

class Child {
  childName: string;
  weightLengthDataByMonth: ChildData[] = [];

  readonly KG_TO_LB: number = 2.204623;
  readonly IN_TO_CM: number = 2.54;
  readonly M_TO_CM: number = 100;

  constructor(childName: string) {
    this.childName = childName;
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

  getHeightChartData(unitType: UnitsOfMeasurement): any {
    let heightbyMonth: { name: string; value: string }[] = [];

    let divider: number = 1;
    if (unitType === UnitsOfMeasurement.in) divider = this.IN_TO_CM;

    for (let data of this.weightLengthDataByMonth) {
      heightbyMonth.push({
        name: data.age,
        value: Math.round(data.height / divider).toString(),
      });
    }
    return { name: this.childName, series: heightbyMonth };
  }

  getWeightChartData(unitType: UnitsOfMeasurement): any {
    let multiplier: number = 1;
    if (unitType === UnitsOfMeasurement.lb) multiplier = this.KG_TO_LB;
    let weightbyMonth: { name: string; value: string }[] = [];
    for (let data of this.weightLengthDataByMonth) {
      weightbyMonth.push({
        name: data.age,
        value: Math.round(data.weight * multiplier).toString(),
      });
    }
    return { name: this.childName, series: weightbyMonth };
  }

  getWeightHeightChartData(
    heightMeasurementUnit: UnitsOfMeasurement,
    weightMeasurementUnit: UnitsOfMeasurement
  ): any {
    let multiplier: number = 1;
    if (weightMeasurementUnit === UnitsOfMeasurement.lb)
      multiplier = this.KG_TO_LB;

    let divider: number = 1;
    if (heightMeasurementUnit === UnitsOfMeasurement.in)
      divider = this.IN_TO_CM;

    let weightbyHeight: { name: string; value: string }[] = [];
    for (let data of this.weightLengthDataByMonth) {
      weightbyHeight.push({
        name: Math.round(data.height / divider).toString(),
        value: Math.round(data.weight * multiplier).toString(),
      });
    }

    return { name: this.childName, series: weightbyHeight };
  }

  getBMIChartData(): any {
    let bmiByMonth: { name: string; value: string }[] = [];
    for (let data of this.weightLengthDataByMonth) {
      bmiByMonth.push({
        name: data.age,
        value: (
          data.weight / Math.pow(data.height / this.M_TO_CM, 2)
        ).toString(),
      });
    }
    return { name: this.childName, series: bmiByMonth };
  }
}

class DataManipulation {
  static getDeepCopy(data: any) {
    return JSON.parse(JSON.stringify(data));
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
  BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];

  //height - age
  BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - age
  BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - height
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //girls

  //bmi
  GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];

  //height - age
  GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - age
  GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - height
  GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN: any[];
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM: any[];
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM: any[];
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN: any[];
  //BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN: any[];
  //GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN: any[];

  // constant to validate the forms
  readonly MAX_AGE_MONTHS = 24;
  readonly MIN_AGE_MONTHS = 0;
  readonly MAX_HEIGHT_CENTIMETERS = 140;
  readonly MIN_HEIGHT_CENTIMETERS = 0;
  readonly MAX_WEIGHT_KILOGRAMS = 100;
  readonly MIN_WEIGHT_KILOGRAMS = 0;

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

  // measure unit options

  heightUnitOptions: UnitsOfMeasurement = UnitsOfMeasurement.cm;
  weightUnitOptions: UnitsOfMeasurement = UnitsOfMeasurement.kg;

  // child data
  childName: string = "";
  childHeight: string = "";
  childWeight: string = "";
  childAge: string = "";

  childGender: Gender.NotAssigned;
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
  chosenChartOption: ChartOption = ChartOption.NotAssigned;
  currentGrowthChartData: GrowthChartData = GrowthChartData.NONE;

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

  constructor(
    private parentService: ParentService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    //BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN,
    //GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_IN,
    Object.assign(this, {
      BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN,
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM,

      GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN,
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM,
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

  onUnitsChange(typeOfChart: string) {
    this.onTypeChartChange(typeOfChart);
  }

  onAddingData() {
    this.currentChild.addData(
      new ChildData(
        this.childAge,
        parseFloat(this.childWeight),
        parseFloat(this.childHeight)
      )
    );

    this.plottingData();
  }

  plottingData() {
    console.log("currentChild: ", this.currentChild);

    let newResult = [];

    switch (this.currentGrowthChartData) {
      case GrowthChartData.BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(this.currentChild.getBMIChartData());
        } else newResult = BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(
            this.currentChild.getHeightChartData(this.heightUnitOptions)
          );
        } else newResult = BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
          );
          newResult.push(
            this.currentChild.getHeightChartData(this.heightUnitOptions)
          );
        } else
          newResult =
            BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        break;
      case GrowthChartData.BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );

          newResult.push(
            this.currentChild.getWeightChartData(this.weightUnitOptions)
          );
        } else newResult = BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
          );
          newResult.push(
            this.currentChild.getWeightChartData(this.weightUnitOptions)
          );
        } else
          newResult =
            BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        break;
      case GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult = BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult =
            BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        break;
      case GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult =
            BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN;
        break;
      case GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult =
            BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM;
        break;
      case GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult =
            BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        break;
      case GrowthChartData.GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(this.currentChild.getBMIChartData());
        } else newResult = GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(
            this.currentChild.getHeightChartData(this.heightUnitOptions)
          );
        } else
          newResult = GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
          );
          newResult.push(
            this.currentChild.getHeightChartData(this.heightUnitOptions)
          );
        } else
          newResult =
            GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        break;
      case GrowthChartData.GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(
            this.currentChild.getWeightChartData(this.weightUnitOptions)
          );
        } else
          newResult = GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;

      case GrowthChartData.GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
          );
          newResult.push(
            this.currentChild.getWeightChartData(this.weightUnitOptions)
          );
        } else
          newResult =
            GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        break;
      case GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult = GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult =
            GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        break;
      case GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult =
            GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN;
        break;
      case GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult =
            GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM;
        break;
      case GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.weightLengthDataByMonth.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
          );
          newResult.push(
            this.currentChild.getWeightHeightChartData(
              this.heightUnitOptions,
              this.weightUnitOptions
            )
          );
        } else
          newResult =
            GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        break;
    }

    this.results = newResult;
  }

  onChildrenChange() {
    console.log("this.childList.length: ", this.childList.length);
    if (this.childList.length === 0)
      for (let name of this.currentParent.childrennames) {
        this.childList.push(new Child(name));
      }

    let filteredData = this.childList.find(
      (x) => x.childName === this.childName
    );

    console.log("filteredData", filteredData);
    this.currentChild = filteredData;
    this.onTypeChartChange(this.chosenChartOption);
  }

  // the event is triggered when the type of chart is changed
  onTypeChartChange(typeOfChart: string) {
    switch (typeOfChart) {
      case ChartOption.BMI: {
        this.getMBIChart(this.childGender);
        this.yAxisLabel = this.translate.instant(
          `${this.childGender} BMI - Metric System`
        );
        this.xAxisLabel = this.translate.instant("Age (month)");
        break;
      }
      case ChartOption.HeightAge: {
        this.getHeightAgeChart(this.childGender);
        this.xAxisLabel = this.translate.instant("Age (month)");
        this.yAxisLabel =
          this.translate.instant(`${this.childGender} Height`) +
          ` (${this.heightUnitOptions})`;
        break;
      }
      case ChartOption.WeightAge: {
        this.getWeightAgeChart(this.childGender);
        this.xAxisLabel = this.translate.instant("Age (month)");
        this.yAxisLabel =
          this.translate.instant(`${this.childGender} Weight`) +
          ` (${this.heightUnitOptions})`;
        break;
      }
      case ChartOption.WeightHeight: {
        this.getWeightHeightChart(this.childGender);
        this.xAxisLabel =
          this.translate.instant(`${this.childGender} Height`) +
          ` (${this.heightUnitOptions})`;
        this.yAxisLabel =
          this.translate.instant(`${this.childGender} Weight`) +
          ` (${this.weightUnitOptions})`;
        break;
      }
    }
    this.plottingData();
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
  }

  /* 
    due the fact that we don't have a bmi data from the who webside for the us customary system, an approach to solve the issue
    is to convert the units of measurements from lb to kg and from in to meters to calculate the bmi data provided 
    by the parent
   */
  getMBIChart(childGender: string) {
    if (childGender === Gender.Male) {
      this.currentGrowthChartData =
        GrowthChartData.BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
      //return BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
    } else if (childGender === Gender.Female) {
      this.currentGrowthChartData =
        GrowthChartData.GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
      //return GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
    }
  }
  // get the correct data for MBI charts depending on gender
  getHeightAgeChart(childGender: Gender) {
    switch (this.heightUnitOptions) {
      case UnitsOfMeasurement.cm:
        if (childGender === Gender.Male) {
          this.currentGrowthChartData =
            GrowthChartData.BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
          //return BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        } else if (childGender === Gender.Female) {
          this.currentGrowthChartData =
            GrowthChartData.GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
          //return GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        }
        break;
      case UnitsOfMeasurement.in:
        if (childGender === Gender.Male) {
          this.currentGrowthChartData =
            GrowthChartData.BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
          //return BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        } else if (childGender === Gender.Female) {
          this.currentGrowthChartData =
            GrowthChartData.GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
          //return GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        }
        break;
    }
  }

  // get the correct data for MBI charts depending on gender
  getWeightAgeChart(childGender: Gender) {
    switch (this.weightUnitOptions) {
      case UnitsOfMeasurement.kg:
        if (childGender === Gender.Male) {
          this.currentGrowthChartData =
            GrowthChartData.BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
          //return BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        } else if (childGender === Gender.Female) {
          this.currentGrowthChartData =
            GrowthChartData.GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
          //return GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        }
        break;
      case UnitsOfMeasurement.lb:
        if (childGender === Gender.Male) {
          this.currentGrowthChartData =
            GrowthChartData.BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
          //return BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        } else if (childGender === Gender.Female) {
          this.currentGrowthChartData =
            GrowthChartData.GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
          //return GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        }
        break;
    }
  }

  // get the correct data for Weight_vs_Height charts depending on gender and unit of measurements.
  // The data for WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS for male and female has to many points to plot. So, to obtain more pleasant
  // visual effects will be trimmed to a maximum 24 points (MAX_RANGE_MONTHS) where the avg
  //  of the values of the child will be the media of the graph
  getWeightHeightChart(childGender: Gender) {
    switch (this.weightUnitOptions) {
      case UnitsOfMeasurement.kg:
        if (this.heightUnitOptions === UnitsOfMeasurement.cm) {
          if (childGender === Gender.Male) {
            this.currentGrowthChartData =
              GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;

            /*return this.trimChartData(
              this.childHeight,
              this.MAX_AGE_MONTHS,
              BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
            );*/
          } else if (childGender === Gender.Female) {
            this.currentGrowthChartData =
              GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
            /*
            return this.trimChartData(
              this.childHeight,
              this.MAX_AGE_MONTHS,
              GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
            );
            */
          }
        } else if (this.heightUnitOptions === UnitsOfMeasurement.in) {
          if (childGender === Gender.Male) {
            this.currentGrowthChartData =
              GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN;
            /*
            return this.trimChartData(
              this.childHeight,
              this.MAX_AGE_MONTHS,
              BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN
            );
            */
          } else if (childGender === Gender.Female) {
            this.currentGrowthChartData =
              GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN;
            /*
            return this.trimChartData(
              this.childHeight,
              this.MAX_AGE_MONTHS,
              GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN
            );
            */
          }
        }
        break;
      case UnitsOfMeasurement.lb:
        if (this.heightUnitOptions === UnitsOfMeasurement.cm) {
          if (childGender === Gender.Male) {
            this.currentGrowthChartData =
              GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM;
            /*  
            return this.trimChartData(
              this.childHeight,
              this.MAX_AGE_MONTHS,
              BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM
            );
            */
          } else if (childGender === Gender.Female) {
            this.currentGrowthChartData =
              GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM;
            /*  
            return this.trimChartData(
              this.childHeight,
              this.MAX_AGE_MONTHS,
              GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM
            );
            */
          }
        } else if (this.heightUnitOptions === UnitsOfMeasurement.in) {
          if (childGender === Gender.Male) {
            this.currentGrowthChartData =
              GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
            /* 
            return this.trimChartData(
              this.childHeight,
              this.MAX_AGE_MONTHS,
              BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
            );*/
          } else if (childGender === Gender.Female) {
            this.currentGrowthChartData =
              GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
            /*
            return this.trimChartData(
              this.childHeight,
              this.MAX_AGE_MONTHS,
              GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM
            );
            */
          }
        }
        break;
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
