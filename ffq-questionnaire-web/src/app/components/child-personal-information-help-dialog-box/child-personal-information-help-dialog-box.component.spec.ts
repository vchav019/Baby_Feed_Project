import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPersonalInformationHelpDialogBoxComponent } from './child-personal-information-help-dialog-box.component';

describe('ChildPersonalInformationHelpDialogBoxComponent', () => {
  let component: ChildPersonalInformationHelpDialogBoxComponent;
  let fixture: ComponentFixture<ChildPersonalInformationHelpDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildPersonalInformationHelpDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildPersonalInformationHelpDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
