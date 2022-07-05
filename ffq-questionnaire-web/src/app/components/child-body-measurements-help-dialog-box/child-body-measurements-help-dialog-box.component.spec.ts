import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBodyMeasurementsHelpDialogBoxComponent } from './child-body-measurements-help-dialog-box.component';

describe('ChildBodyMeasurementsHelpDialogBoxComponent', () => {
  let component: ChildBodyMeasurementsHelpDialogBoxComponent;
  let fixture: ComponentFixture<ChildBodyMeasurementsHelpDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildBodyMeasurementsHelpDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildBodyMeasurementsHelpDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
