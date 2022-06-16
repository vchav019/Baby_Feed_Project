import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { hexToRgb, PolarChartComponent } from '@swimlane/ngx-charts';
import { stat } from 'fs';

//who

  //boys

    //bmi
    import { BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/boys/bmi/boys_bmi_for_age_birth_to_two_years';


    //height - age
    import { BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/boys/height - age/boys_length_for_age_birth_to_two_years';

    //weight - age
    import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/boys/weight - age/boys_weight_for_age_birth_to_two_years';
    
    //weight - height
    import { BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/boys/weight - height/boys_weight_for_length_birth_to_two_years';


  //girls

    //bmi
    import { GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/girls/bmi/girls_bmi_for_age_birth_to_two_years';
  

    //height - age
    import { GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/girls/height - age/girls_length_for_age_birth_to_two_years';
  

    //weight - age
    import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/girls/weight - age/girls_weight_for_age_birth_to_two_years';
    
    //weight - height
    import { GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/girls/weight - height/girls_weight_for_length_birth_to_two_years';
  

    import {ParentService} from 'src/app/services/parent/parent-service';
    import {AuthenticationService} from '../../services/authentication/authentication.service';
    import {ActivatedRoute} from '@angular/router';
    import {FFQParentResponse} from 'src/app/models/ffqparent-response';
    import {Observable} from 'rxjs';

    class Child{
      childName: string;
      childGender: string;
      data: {age: string, height: string, weight: string }[] = [];
    
      constructor(childName: string, gender: string){
        this.childName = childName;
        this.childGender = gender;
      }
    }

@Component({
  selector: 'app-growth-charts-page',
  templateUrl: './growth-charts-page.component.html',
  styleUrls: ['./growth-charts-page.component.css']
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

  view: any[] = [1400, 1400];
  results: any[] =  BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS;



  readonly MAX_RANGE_MONTHS = 24;



    // currentParent
    private userId: string;
    private id: string;
    private patientName: any;
    private userType: any;
    public currentParent: FFQParentResponse = new FFQParentResponse('','','','','','','','',[],false,'','',0,[]);
  


// child data

childName: string = '';
childHeight: string = "0";
childWeight: string = "0";
childAge: string = "0";
childAgeMonths: string = "0";
childGender: string = '';


child = new Child(this.childName, this.childGender);


  // charts options
  
  
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "Age (months)";
  yAxisLabel: string = 'Length (cm)';
  timeline: boolean = true;


  // options added
  position: string = "right";

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

 

  constructor(private parentService: ParentService, private authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute) {

    const parent: Observable<FFQParentResponse> = this.parentService.getParent(this.authenticationService.currentUserId);
    parent.subscribe((a)=>{this.currentParent = a});

    console.log(this.currentParent);
    Object.assign(this, 
      { 
        BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS, BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS,
        BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS, BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS,
        GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS, GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS,
        GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS, GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS
      });

  }


// backend

// the event is triggered when the name of the child is changed.
onChildNameChange(event: any){
  this.child.childName = event.target.value;
  //this.childName = event.target.value;
}

// the event is triggered when the height (cm) of the child is changed
onHeightChange(event: any){
  this.childHeight = event.target.value;
}

// the event is triggered when the weight (Kg) of the child is changed
onWeightChange(event: any){
  this.childWeight = event.target.value;
}

// the event is triggered when the age (months) of the child is changed
onAgeChange(event: any){

  this.childAge = event.target.value;
}

  
// the event is triggered when the gender of the child is changed
onGenderChange(event: any){
  //this.childGender = ((event.value === "1") ? "Male" : "Female");
  this.child.childGender = ((event.value === "1") ? "Male" : "Female");
}

// the event is triggered when the type of chart is changed
onTypeChartChange(typeOfChart : string) {
 

  switch(typeOfChart){
    case "BMI":{
      this.results = this.getMBIChart(this.childGender);
      this.yAxisLabel = "BMI";
      this.xAxisLabel = "Age (months)";
      break;
    }
    case "Height-Age":{
      this.results = this.getHeightAgeChart(this.childGender);
      this.yAxisLabel = "Length (cm)";
      this.xAxisLabel = "Age (months)";
      break;
    }
    case "Weight-Age":{
      this.results = this.getWeightAgeChart(this.childGender);
      this.yAxisLabel = "Weight (kg)";
      this.xAxisLabel = "Age (months)";
      break;
    }
    case "Weight-Height":{
      
      this.results = this.getWeightHeightChart(this.childGender);
      this.yAxisLabel = "Weight (kg)";
      this.xAxisLabel = "Length (cm)";
      break;
    }
  }
 }

 onSavePoint(event: any){

  this.child.data.push({age: this.childAge, height: this.childHeight,weight: this.childWeight});
   
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


  ngOnInit(): void {



   
  }


  // get the correct data for MBI charts depending on gender
getMBIChart(childGender: string): any[]
{
  return childGender === "Male" ? BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS : GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS;
}

  // get the correct data for MBI charts depending on gender
getHeightAgeChart(childGender: string): any[]
{
  return childGender === "Male" ? BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS : GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS;
}

  // get the correct data for MBI charts depending on gender
getWeightAgeChart(childGender: string): any[]
{
  return childGender === "Male" ? BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS : GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS;
}

  // get the correct data for MBI charts depending on gender. 
  // The data for WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS for male and female has to many points to plot. So, to obtain more pleasant
  // visual effects will be trimmed to a maximum 24 points (MAX_RANGE_MONTHS) where the avg of the values of the child will be the media of the graph
getWeightHeightChart(childGender: string): any[]
{
  return childGender === "Male" ? this.trimChartData(this.childHeight, this.MAX_RANGE_MONTHS, BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS) : this.trimChartData(this.childHeight, this.MAX_RANGE_MONTHS, GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS);
}


  // find an optimal interval where pointX is centered and the range is total number of point in the interval 
trimChartData(pointX: string, range: number, chartData: any []){

  let index = this.getIndex(pointX, chartData[0].series, 0, chartData[0].series.length - 1);

  let suitableIndexLeft = index - range;
  let suitableIndexRight = index + range;

  console.log(suitableIndexLeft);

  while(suitableIndexLeft < 0){

    suitableIndexLeft++;

  }
  
  while(suitableIndexRight >= chartData[0].series.length){
    suitableIndexRight--;
  }

 
 
  let left = suitableIndexLeft;
  let min = Number.MAX_VALUE;

  do {

    if(Math.abs((index - suitableIndexLeft) - (suitableIndexRight - index))< min){
      left = suitableIndexLeft;
      suitableIndexRight = index + range - (index - left);
      min = Math.abs((index - suitableIndexLeft) - (suitableIndexRight - index));
    }
    suitableIndexLeft++;
    
  } while (suitableIndexLeft < index && suitableIndexLeft + range - 1   < chartData[0].series.length);

  
  let startIndex = left; 
  let ChartDataInRange: any [] = [];

  for(let percentile of chartData){

    let chartDataSeries: any [] = [];
    for(let j = startIndex; j < startIndex + range ; j++){
      chartDataSeries.push(percentile.series[j]);
    }
    ChartDataInRange.push({name:percentile.name,series:chartDataSeries});
    
  }
  return ChartDataInRange;

}

getIndex(pointX: string, dataChart: any [], startIndex: number, endIndex: number){

  if(endIndex >= startIndex){

    let middleIndex = Math.floor((startIndex+endIndex)/2);
    if (parseFloat(dataChart[middleIndex].name) === parseFloat(pointX) || endIndex == startIndex)
      return middleIndex;
       
    if (parseFloat(dataChart[middleIndex].name) > parseFloat(pointX))
    return this.getIndex(pointX, dataChart,startIndex, middleIndex-1);
  
    return this.getIndex(pointX, dataChart,middleIndex + 1,endIndex);

  }
  if(parseFloat(pointX) < parseFloat(dataChart[0].name))
    return 0;
  if(parseFloat(pointX) > parseFloat(dataChart[dataChart.length - 1].name))
    return dataChart.length - 1;

}
 
}
