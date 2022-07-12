import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-serving-size-pictures',
  templateUrl: './serving-size-pictures.component.html',
  styleUrls: ['./serving-size-pictures.component.css']
})
export class ServingSizePicturesComponent implements OnInit {

  @Input() title = '';
  @Input() imageUrl = '';
  @Input() content = '';
  

  posts = [
    {
      title: 'Formula',
      imageUrl: 'assets/serving-size-images/formula.jpg',
      content: 'Formula oz amounts'
    },
    {
      title: 'Cereal added to milk (examples: rice, wheat, mixed cereals, etc.)',
      imageUrl: 'assets/serving-size-images/Cereal-added-to-milk.jpg',
      content: ''
    },
    {
      title: 'Cows milk (white milk, alone, without flavor)',
      imageUrl: 'assets/serving-size-images/cows-milk.jpg',
      content: ''
    },
    {
      title: 'Milk with chocolate, strawberry, or vanilla (include Nido, frozen beverages, milk shakes, hot chocolate, etc.)',
      imageUrl: 'assets/serving-size-images/Flavored-Milk-tsp-oz .jpg',
      content: ''
    },
    {
      title: 'PediaSure (Grow & Gain Shakes)',
      imageUrl: 'assets/serving-size-images/Vitamin-Enriched-Pediatric-Milk-Beverages.jpg',
      content: ''
    },
    {
      title: 'Orange juice 100% (not orange beverage)',
      imageUrl: 'assets/serving-size-images/Sodas.jpg',
      content: ''
    },
    {
      title: '100% vegetable juice (examples: carrot, tomato, etc.)',
      imageUrl: 'assets/serving-size-images/Sodas.jpg',
      content: ''
    },
    {
      title: 'Other fruit beverages (examples: Hi-C, Space gang, Sunny D, etc.)',
      imageUrl: 'assets/serving-size-images/Sodas.jpg',
      content: ''
    },
    {
      title: 'Sodas (examples: Coca-Cola, Pepsi, 7-Up, Fanta, Malta, etc.)',
      imageUrl: 'assets/serving-size-images/Sodas.jpg',
      content: ''
    },
    {
      title: 'Kool-Aid, Tang, Iced Tea (examples: Nestea, Lipton, etc.)',
      imageUrl: 'assets/serving-size-images/Sodas.jpg',
      content: ''
    },
    {
      title: 'Hot cereal (examples: rice cereal, cream of wheat, oatmeal, corn mush, etc.)',
      imageUrl: 'assets/serving-size-images/Hot-cereal.jpg',
      content: ''
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
