import { Component, OnInit } from '@angular/core';

//who

  //boys

    //bmi
    import { BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/boys/bmi/boys_bmi_for_age_birth_to_two_years';
    import { BOYS_BMI_FOR_AGE_TWO_TO_FIVE_YEARS } from '../../../assets/growth-charts-data/who/boys/bmi/boys_bmi_for_age_two_to_five_years';

    //height - age
    import { BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/boys/height - age/boys_length_for_age_birth_to_two_years';
    import { BOYS_LENGTH_FOR_AGE_TWO_TO_FIVE_YEARS } from '../../../assets/growth-charts-data/who/boys/height - age/boys_length_for_age_two_to_five_years';

    //weight - age
    import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_FIVE_YEARS } from '../../../assets/growth-charts-data/who/boys/weight - age/boys_weight_for_age_birth_to_five_years';
    
    //weight - height
    import { BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/boys/weight - height/boys_weight_for_length_birth_to_two_years';
    import { BOYS_WEIGHT_FOR_LENGTH_TWO_TO_FIVE_YEARS } from '../../../assets/growth-charts-data/who/boys/weight - height/boys_weight_for_length_two_to_five_years';

  //girls

    //bmi
    import { GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/girls/bmi/girls_bmi_for_age_birth_to_two_years';
    import { GIRLS_BMI_FOR_AGE_TWO_TO_FIVE_YEARS } from '../../../assets/growth-charts-data/who/girls/bmi/girls_bmi_for_age_two_to_five_years';

    //height - age
    import { GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/girls/height - age/girls_length_for_age_birth_to_two_years';
    import { GIRLS_LENGTH_FOR_AGE_TWO_TO_FIVE_YEARS } from '../../../assets/growth-charts-data/who/girls/height - age/girls_length_for_age_two_to_five_years';

    //weight - age
    import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_FIVE_YEARS } from '../../../assets/growth-charts-data/who/girls/weight - age/girls_weight_for_age_birth_to_five_years';
    
    //weight - height
    import { GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS } from '../../../assets/growth-charts-data/who/girls/weight - height/girls_weight_for_length_birth_to_two_years';
    import { GIRLS_WEIGHT_FOR_LENGTH_TWO_TO_FIVE_YEARS } from '../../../assets/growth-charts-data/who/girls/weight - height/girls_weight_for_length_two_to_five_years';
    



//cdc

  //boys

    //bmi
    import { BOYS_BMI_FOR_AGE_TWO_TO_TWENTY_YEARS } from '../../../assets/growth-charts-data/cdc/boys/bmi/boys_bmi_for_age_two_to_twenty_years';

    //height - age
    import { BOYS_LENGTH_FOR_AGE_TWO_TO_TWENTY_YEARS } from '../../../assets/growth-charts-data/cdc/boys/height - age/boys_length_for_age_two_to_twenty_years';

    //weight - age
    import { BOYS_WEIGHT_FOR_AGE_TWO_TWENTY_YEARS } from '../../../assets/growth-charts-data/cdc/boys/weight - age/boys_weight_for_age_two_to_twenty_years';

  //girls

   //bmi
   import { GIRLS_BMI_FOR_AGE_TWO_TO_TWENTY_YEARS } from '../../../assets/growth-charts-data/cdc/girls/bmi/girls_bmi_for_age_two_to_twenty_years';
   
   //height - age
   import { GIRLS_LENGTH_FOR_AGE_TWO_TO_TWENTY_YEARS } from '../../../assets/growth-charts-data/cdc/girls/height - age/girls_length_for_age_two_to_twenty_years';
   
   //weight - age
   import { GIRLS_WEIGHT_FOR_AGE_TWO_TWENTY_YEARS } from '../../../assets/growth-charts-data/cdc/girls/weight - age/girls_weight_for_age_two_to_twenty_years';
 



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
      BOYS_BMI_FOR_AGE_TWO_TO_FIVE_YEARS : any[];

      //height - age
      BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS: any[];
      BOYS_LENGTH_FOR_AGE_TWO_TO_FIVE_YEARS: any[];

      //weight - age
      BOYS_WEIGHT_FOR_AGE_BIRTH_TO_FIVE_YEARS: any[];

      //weight - height
      BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS: any[];
      BOYS_WEIGHT_FOR_LENGTH_TWO_TO_FIVE_YEARS: any[];

    //girls

      //bmi
      GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS: any[];
      GIRLS_BMI_FOR_AGE_TWO_TO_FIVE_YEARS : any[];

      //height - age
      GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS: any[];
      GIRLS_LENGTH_FOR_AGE_TWO_TO_FIVE_YEARS: any[];

      //weight - age
      GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_FIVE_YEARS: any[];

      //weight - height
      GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS: any[];
      GIRLS_WEIGHT_FOR_LENGTH_TWO_TO_FIVE_YEARS: any[];



//cdc

  //boys

    //bmi
    BOYS_BMI_FOR_AGE_TWO_TO_TWENTY_YEARS: any[];

    //height - age
    BOYS_LENGTH_FOR_AGE_TWO_TO_TWENTY_YEARS: any[];

    //weight - age
    BOYS_WEIGHT_FOR_AGE_TWO_TWENTY_YEARS: any[];

  //girls

   //bmi
   GIRLS_BMI_FOR_AGE_TWO_TO_TWENTY_YEARS: any[];

   //height - age
   GIRLS_LENGTH_FOR_AGE_TWO_TO_TWENTY_YEARS: any[];
   
   //weight - age
   GIRLS_WEIGHT_FOR_AGE_TWO_TWENTY_YEARS: any[];

  
 

  view: any[] = [1400, 1400];
  results: any[] =  BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS;




// child data

childName: string = '';
childHeight: number = 0;
childWeight: number = 0;
childDOB: Date = new Date();
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
  position: string = "right";
  legendTitle: string = "Percentiles";


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
        BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS, BOYS_BMI_FOR_AGE_TWO_TO_FIVE_YEARS, BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS,
        BOYS_LENGTH_FOR_AGE_TWO_TO_FIVE_YEARS, BOYS_WEIGHT_FOR_AGE_BIRTH_TO_FIVE_YEARS, BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS,
        BOYS_WEIGHT_FOR_LENGTH_TWO_TO_FIVE_YEARS, GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS, GIRLS_BMI_FOR_AGE_TWO_TO_FIVE_YEARS, 
        GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS, GIRLS_LENGTH_FOR_AGE_TWO_TO_FIVE_YEARS, GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_FIVE_YEARS, 
        GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS, GIRLS_WEIGHT_FOR_LENGTH_TWO_TO_FIVE_YEARS, BOYS_BMI_FOR_AGE_TWO_TO_TWENTY_YEARS, 
        BOYS_LENGTH_FOR_AGE_TWO_TO_TWENTY_YEARS, BOYS_WEIGHT_FOR_AGE_TWO_TWENTY_YEARS, GIRLS_BMI_FOR_AGE_TWO_TO_TWENTY_YEARS, 
        GIRLS_LENGTH_FOR_AGE_TWO_TO_TWENTY_YEARS, GIRLS_WEIGHT_FOR_AGE_TWO_TWENTY_YEARS});
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
onDOBChange(event: any){

  this.childDOB = new Date(event.value);
  this.childAgeMonths = this.getMonthDifference(this.childDOB, new Date());
}

// it returns the difference of two dates in months
getMonthDifference(startDate: Date, endDate: Date): number {
  return  endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear());
}

onGenderChange(event: any){
  this.childGender = ((event.value === "1") ? "Male" : "Female");
  console.log(this.childGender);
}


onTypeChartChange(typeOfChart : string) {
 

  switch(typeOfChart){
    case "BMI":{
      //[yScaleMin] = "40"
      //[yAxisTicks] = "[40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]"
      this.results = this.getMBIChart(this.childGender, this.childAgeMonths);
      break;
    }
    case "Height-Age":{
      this.results = this.getHeightAgeChart(this.childGender, this.childAgeMonths);
      break;
    }
    case "Weight-Age":{
      this.results = this.getWeightAgeChart(this.childGender, this.childAgeMonths);
      break;
    }
    case "Weight-Height":{
      this.results = this.getWeightHeightChart(this.childGender, this.childAgeMonths);
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


getMBIChart(childGender: string, childAgeMonths: number): any[]
 {
   if(childGender === "Male")
   {
     if(childAgeMonths <= 24){
       return BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS;
      }
      else if(childAgeMonths > 24 && childAgeMonths <= 60)
      {
        return BOYS_BMI_FOR_AGE_TWO_TO_FIVE_YEARS;
      }
      else if(childAgeMonths <= 240)
      return BOYS_BMI_FOR_AGE_TWO_TO_TWENTY_YEARS;
    }
    else if(childGender === "Female")
    {
      if(childAgeMonths <= 24)
      {
        return GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS;
      }
      else if(childAgeMonths > 24 && childAgeMonths <= 60)
      {
        return GIRLS_BMI_FOR_AGE_TWO_TO_FIVE_YEARS;
      }
      else if(childAgeMonths <= 240)
      return GIRLS_BMI_FOR_AGE_TWO_TO_TWENTY_YEARS;
    }
  }

getHeightAgeChart(childGender: string, childAgeMonths: number): any[]
{
  if(childGender === "Male")
  {
    if(childAgeMonths <= 24){
      return BOYS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS;
    }
    else if(childAgeMonths > 24 && childAgeMonths <= 60){
      return BOYS_LENGTH_FOR_AGE_TWO_TO_FIVE_YEARS;
    }
    else if(childAgeMonths <= 240)
    return BOYS_LENGTH_FOR_AGE_TWO_TO_TWENTY_YEARS;
  }
  else if(childGender === "Female")
  {
    if(childAgeMonths <= 24)
    {
      return GIRLS_LENGTH_FOR_AGE_BIRTH_TO_TWO_YEARS;
    }
    else if(childAgeMonths > 24 && childAgeMonths <= 60)
    {
      return GIRLS_LENGTH_FOR_AGE_TWO_TO_FIVE_YEARS;
    }
    else if(childAgeMonths <= 240)
    return GIRLS_LENGTH_FOR_AGE_TWO_TO_TWENTY_YEARS;
    }
  }

getWeightAgeChart(childGender: string, childAgeMonths: number): any[]
{
  if(childGender === "Male")
  {
    if(childAgeMonths <= 60)
    {
      return BOYS_WEIGHT_FOR_AGE_BIRTH_TO_FIVE_YEARS;
    }
    else if(childAgeMonths > 60 && childAgeMonths <= 240)
    {
      return BOYS_WEIGHT_FOR_AGE_TWO_TWENTY_YEARS
    }
  }
  else if(childGender === "Female")
  {
    if(childAgeMonths <= 60)
    {
      return GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_FIVE_YEARS;
    }
    else if(childAgeMonths > 60 && childAgeMonths <= 240)
    {
      return GIRLS_WEIGHT_FOR_AGE_TWO_TWENTY_YEARS;
    }
  }
}

getWeightHeightChart(childGender: string, childAgeMonths: number): any[]
{
  if(childGender === "Male")
  {
    if(childAgeMonths <= 60)
    {
      return BOYS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS;
    }
    else if(childAgeMonths > 60 && childAgeMonths <= 240)
    {
      return BOYS_WEIGHT_FOR_LENGTH_TWO_TO_FIVE_YEARS;
    }
  }
  else if(childGender === "Female")
  {
    if(childAgeMonths <= 60)
    {
      return GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS;
    }
    else if(childAgeMonths > 60 && childAgeMonths <= 240)
    {
      return GIRLS_WEIGHT_FOR_LENGTH_TWO_TO_FIVE_YEARS;
    }
  }
}



trimDataChart(data: any[], point: number){

}

}




