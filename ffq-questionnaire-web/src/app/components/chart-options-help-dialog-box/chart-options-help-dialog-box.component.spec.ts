import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOptionsHelpDialogBoxComponent } from './chart-options-help-dialog-box.component';

describe('ChartOptionsHelpDialogBoxComponent', () => {
  let component: ChartOptionsHelpDialogBoxComponent;
  let fixture: ComponentFixture<ChartOptionsHelpDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOptionsHelpDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartOptionsHelpDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
