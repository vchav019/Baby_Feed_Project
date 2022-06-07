import { Component, OnInit } from '@angular/core';

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




// child data

childName: string = '';
childHeight: number = 0;
childWeight: number = 0;
childAge: number = 0;
childAgeMonths: number = 0;
childGender: string = '';




  // charts options
  
  
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


  // options added
  position: string = "below";

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
  this.childName = event.target.value;
}

// the event is triggered when the height of the child is changed
onHeightChange(event: any){
  this.childHeight = event.target.value;
}

// the event is triggered when the weight of the child is changed
onWeightChange(event: any){
  this.childWeight = event.target.value;
}

// the event is triggered when the date of birth of the child is changed
// it calculates the age of the child by months
onAgeChange(event: any){

  this.childAge = event.target.value;
}

 

onGenderChange(event: any){
  this.childGender = ((event.value === "1") ? "Male" : "Female");
}


onTypeChartChange(typeOfChart : string) {
 

  switch(typeOfChart){
    case "BMI":{
      this.results = this.getMBIChart(this.childGender);
      this.yAxisLabel = "BMI";
      this.xAxisLabel = "Months";
      break;
    }
    case "Height-Age":{
      this.results = this.getHeightAgeChart(this.childGender);
      this.yAxisLabel = "Length";
      this.xAxisLabel = "Months";
      break;
    }
    case "Weight-Age":{
      this.results = this.getWeightAgeChart(this.childGender);
      this.yAxisLabel = "Weight";
      this.xAxisLabel = "Months";
      break;
    }
    case "Weight-Height":{
      this.results = this.getWeightHeightChart(this.childGender);
      this.yAxisLabel = "Weight";
      this.xAxisLabel = "Length";
      break;
    }
  }
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


getMBIChart(childGender: string): any[]
{
  return childGender === "Male" ? BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS : GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS;
}

getHeightAgeChart(childGender: string): any[]
{
  return childGender === "Male" ? BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS : GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS;
}

getWeightAgeChart(childGender: string): any[]
{
  return childGender === "Male" ? BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS : GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS;
}

getWeightHeightChart(childGender: string): any[]
{
  return childGender === "Male" ? BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS : GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS;
}

}




