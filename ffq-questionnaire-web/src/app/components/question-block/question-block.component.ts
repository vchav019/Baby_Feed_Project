import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FFQItem} from '../../models/ffqitem';
import {FormControl, Validator, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { FeedingFrequencyComponent } from '../feeding-frequency/feeding-frequency.component';
import { MatDialog } from '@angular/material/dialog';
import { ServingSizePicturesComponent } from '../serving-size-pictures/serving-size-pictures.component';
@Component({
  selector: 'question-block',
  templateUrl: './question-block.component.html',
  styleUrls: ['./question-block.component.css']
})
export class QuestionBlockComponent implements OnChanges {
  FREQUENCY_TYPES = [
    'Week',
    'Day',
  ];
  @Input() foodItem: FFQItem;

  toggleDisable() {
    this.foodItem.disabled = !this.foodItem.disabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.foodItem.isSubmitted = false;
  }
  constructor(private translate: TranslateService, public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(ServingSizePicturesComponent);
  }
}
