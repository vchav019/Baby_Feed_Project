/*
author: Vladimir Chavez

I will assume that every parent will have the following property: childrennames which cannot be empty or null, in case
of being empty or null will give an error. To avoid this, it is necessary to add the capability of adding names of 
children which is not implemented.
This (childrennames) property will have the first name of all children of the current parent. I will add an 
ArrayList of type Children to the db (database) to save the data to plot the growth charts
, so the previous data needs to be modify later on. However, the implementation of the 
growth-chart tab will not give any error for missing the children property.
the children property will be added once the data is saved. Children has the following structure 
{name: string; childData:{weight: string; height: string; age: string}[]}[] where the property
name will be copied from the property childrennames to identify each child. In addition, 
childData will be provided from the user input. 

To select a specific child a menu will show the children names of the property childrennames. 

currentParent: FFQParentResponse <---> the data from current logged in parent 
will be retrieved from the db and saved to currentParent. method: ngOnInit(). FFQParentResponse is a class used to save
the data to the db. That being said, the following case will be explained to clarify the use of the 
ArrayList childrenList. For example, the childrennames has all the names of the parent's children while the arraylist 
children will have all the data of the parent's inputs. So, it might be possible that there are children
that does not have any data saved in the children arraylist because the parent has not saved it yet,
so it is easy to create a children list where all the children are created using the names of the 
childrennames arraylist and the data from the arraylist children is mapped using the names. 
Note that a parent cannot have two children with the same name otherwise will give errors, and childID will need to be 
added. 

Hence, the childrenlist will have chidren without any data and children with data. Example:

{
  "assignedclinic": "1",
  "assignedclinician": "1",
  "childrennames": ["Sarah","Tom"],
  "prefix": "Borinquen",
  "children": [
    {
      "name": "Tom",
      "childData": [
        {
          "weight": "48",
          "height": "52",
          "age": "12"
        }
      ]
    }
  ],
  "timesOfReading": 0,
  "userId": "1",
  "username": "Borinquen_1",
  "userpassword": "parent1",
  "usertype": "parent",
  "firstname": "John",
  "lastname": "Doe",
  "isactive": true,
  "_class": "edu.fiu.ffqr.models.Parent"
}


{
  "userId": "3",
  "username": "FIU_1",
  "userpassword": "parent1",
  "usertype": "parent",
  "firstname": "",
  "lastname": "",
  "assignedclinic": "2",
  "assignedclinician": "2",
  "childrennames": ["Abagail"],
  "isactive": true,
  "prefix": "FIU"
}

currentChild: FFQChildren <---> when a specific child is selected from the menu. the data of the child will be retrieved 
from childList arraylist. method: onChildrenChange()


childrenList: FFQChildren[] <---> contains all the children with or without data. For creating the childrenlist 
the names will be taken from childrennames and the data from the children arraylist.
 

*/

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import { ParentService } from "src/app/services/parent/parent-service";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { FFQParentResponse } from "src/app/models/ffqparent-response";

import { FFQChildren } from "src/app/models/ffqchildren";
import { FFQChildData } from "src/app/models/ffq-childData";

import {
  UnitsOfMeasurement,
  Gender,
  ChartOption,
  GrowthChartData,
} from "src/app/models/Enums";

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

//boys/mixed

//weight - height - mixed: kg_vs_in
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN } from "src/assets/growth-charts-data/who/boys/mixed/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN";

//weight - height - mixed: lb_vs_cm
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM } from "src/assets/growth-charts-data/who/boys/mixed/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM";

//boys/us customary system

//height - age
import { BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/height - age/BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - age
import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/weight - age/BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - height
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/weight - height/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//girls/mixed

//weight - height - mixed: kg_vs_in
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN } from "src/assets/growth-charts-data/who/girls/mixed/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN";

//weight - height - mixed: lb_vs_cm
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM } from "src/assets/growth-charts-data/who/girls/mixed/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM";

//girls/us customary system

//height - age
import { GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/height - age/GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - age
import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/weight - age/GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - height
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/weight - height/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";
import { InterpretationGrowthChartsDialogComponent } from "src/app/components/interpretation-growth-charts-dialog/interpretation-growth-charts-dialog.component";

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

  //weight - height - mixed
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN: any[];
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM: any[];

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

  //weight - height - mixed
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM: any[];
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN: any[];

  // constant to validate the max and min values allowed
  readonly MAX_AGE_MONTHS = 24;
  readonly MIN_AGE_MONTHS = 0;
  readonly MAX_HEIGHT_CENTIMETERS = 110;
  readonly MIN_HEIGHT_CENTIMETERS = 40;
  readonly MAX_WEIGHT_KILOGRAMS = 30;
  readonly MIN_WEIGHT_KILOGRAMS = 1;

  // determines the measurement units selected by the user
  heightUnitOptions: UnitsOfMeasurement = UnitsOfMeasurement.cm;
  weightUnitOptions: UnitsOfMeasurement = UnitsOfMeasurement.kg;

  // curent child data entered by the user
  currentChildName: string = "";
  currentChildHeight: string = "";
  currentChildWeight: string = "";
  currentChildAge: string = "";
  currentChildGender: Gender.NotAssigned;

  // current child
  currentChild: FFQChildren = {} as FFQChildren;

  // children list to avoid working with currentParent.children
  childrenList: FFQChildren[] = [];

  // current parent, data retrived from db
  currentParent: FFQParentResponse;

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

  // to determine the chart selected by the user
  chosenChartOption: ChartOption = ChartOption.NotAssigned;

  // to determine the kind of chart selected by the user depending on gender and units of measurements
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
    private translate: TranslateService,
    private dialog: MatDialog
  ) {
    // assigns the data to be used on the charts
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

    this.currentParent = new FFQParentResponse(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      [] as string[],
      true,
      "",
      "",
      0,
      [] as FFQChildren[]
    );
  }

  onSubmitChildPersonalInformationForm() {
    console.log("Working in progress submitting  Child Personal Information");
  }

  onSubmitChildBodyMeasurementsForm() {
    console.log("Saving data from Child Body Measurements Form");
    this.parentService
      .updateParent(<FFQParentResponse>this.currentParent)
      .subscribe();
  }

  onSubmitChartOptionsForm() {
    console.log("Working in progress submitting Chart options");
  }

  onUnitsChange(typeOfChart: string) {
    this.onTypeChartChange(typeOfChart);
  }

  onAddingData() {
    console.log("Adding data from Child Body Measurements Form");

    if (
      this.heightUnitOptions === UnitsOfMeasurement.cm &&
      this.weightUnitOptions === UnitsOfMeasurement.kg
    ) {
      this.currentChild.addData(
        new FFQChildData(
          this.currentChildWeight,
          this.currentChildHeight,
          this.currentChildAge
        )
      );
    } else if (
      this.heightUnitOptions === UnitsOfMeasurement.cm &&
      this.weightUnitOptions === UnitsOfMeasurement.lb
    ) {
      this.currentChild.addData(
        new FFQChildData(
          (
            parseFloat(this.currentChildWeight) / FFQChildren.KG_TO_LB
          ).toString(),
          this.currentChildHeight,
          this.currentChildAge
        )
      );
    } else if (
      this.heightUnitOptions === UnitsOfMeasurement.in &&
      this.weightUnitOptions === UnitsOfMeasurement.lb
    ) {
      this.currentChild.addData(
        new FFQChildData(
          (
            parseFloat(this.currentChildWeight) / FFQChildren.KG_TO_LB
          ).toString(),
          (
            parseFloat(this.currentChildHeight) * FFQChildren.IN_TO_CM
          ).toString(),
          this.currentChildAge
        )
      );
    } else if (
      this.heightUnitOptions === UnitsOfMeasurement.in &&
      this.weightUnitOptions === UnitsOfMeasurement.kg
    ) {
      this.currentChild.addData(
        new FFQChildData(
          this.currentChildWeight,
          (
            parseFloat(this.currentChildHeight) * FFQChildren.IN_TO_CM
          ).toString(),
          this.currentChildAge
        )
      );
    }

    this.plottingData();
  }

  /*
  It is easy to copy the data from the original charts and add the data entered by
  the user than modified the data from the charts adding and updating the data entered by the user 
  */
  plottingData() {
    let newResult = [];

    // depending on the type of charts we will choose the correct chart taking into
    // account unit of measurements and gender
    switch (this.currentGrowthChartData) {
      case GrowthChartData.BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.childData.length !== 0) {
          // the caat needs to be copy using a deep copy method to avoid data corruption
          newResult = DataManipulation.getDeepCopy(
            BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(this.currentChild.getBMIChartData());
        } else newResult = BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.childData.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(
            this.currentChild.getHeightChartData(this.heightUnitOptions)
          );
        } else newResult = BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );

          newResult.push(
            this.currentChild.getWeightChartData(this.weightUnitOptions)
          );
        } else newResult = BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM:
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
          newResult = DataManipulation.getDeepCopy(
            GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM
          );
          newResult.push(this.currentChild.getBMIChartData());
        } else newResult = GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        break;
      case GrowthChartData.GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM:
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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
        if (this.currentChild.childData.length !== 0) {
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

  /*
    When the parent log in 
  */
  onChildrenChange() {
    if (this.childrenList.length === 0) {
      if (this.currentParent.children === null) {
        this.currentParent.children = [] as FFQChildren[];
      }

      if (this.currentParent.children.length === 0) {
        for (let name of this.currentParent.childrennames) {
          this.childrenList.push(new FFQChildren(name, [] as FFQChildData[]));
        }
      } else {
        for (let name of this.currentParent.childrennames) {
          this.childrenList.push(new FFQChildren(name, [] as FFQChildData[]));
        }
        for (let child of this.currentParent.children) {
          let index = this.childrenList.findIndex((x) => x.name === child.name);
          if (index > -1) {
            for (let data of child.childData)
              this.childrenList[index].addData(data);
          }
        }
      }
      let index = this.childrenList.findIndex(
        (x) => x.name === this.currentChildName
      );
      if (index > -1) {
        this.currentChild = this.childrenList[index];
      }
    }

    this.onTypeChartChange(this.chosenChartOption);
  }

  // the event is triggered when the type of chart is changed
  onTypeChartChange(typeOfChart: string) {
    switch (typeOfChart) {
      case ChartOption.BMI: {
        this.getMBIChart(this.currentChildGender);
        this.yAxisLabel = this.translate.instant(
          `${this.currentChildGender} BMI - Metric System`
        );
        this.xAxisLabel = this.translate.instant("Age (month)");
        break;
      }
      case ChartOption.HeightAge: {
        this.getHeightAgeChart(this.currentChildGender);
        this.xAxisLabel = this.translate.instant("Age (month)");
        this.yAxisLabel =
          this.translate.instant(`${this.currentChildGender} Height`) +
          ` (${this.heightUnitOptions})`;
        break;
      }
      case ChartOption.WeightAge: {
        this.getWeightAgeChart(this.currentChildGender);
        this.xAxisLabel = this.translate.instant("Age (month)");
        this.yAxisLabel =
          this.translate.instant(`${this.currentChildGender} Weight`) +
          ` (${this.heightUnitOptions})`;
        break;
      }
      case ChartOption.WeightHeight: {
        this.getWeightHeightChart(this.currentChildGender);
        this.xAxisLabel =
          this.translate.instant(`${this.currentChildGender} Height`) +
          ` (${this.heightUnitOptions})`;
        this.yAxisLabel =
          this.translate.instant(`${this.currentChildGender} Weight`) +
          ` (${this.weightUnitOptions})`;
        break;
      }
    }
    this.plottingData();
  }

  onSelect(): void {
    //console.log("Item clicked", JSON.parse(JSON.stringify(data)));
    const dialogRef = this.dialog.open(
      InterpretationGrowthChartsDialogComponent
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onActivate(): void {
    //console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(): void {
    //console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    const parent: Observable<FFQParentResponse> = this.parentService.getParent(
      this.authenticationService.currentUserId
    );
    parent.subscribe((parent) => {
      this.currentParent = parent;
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
