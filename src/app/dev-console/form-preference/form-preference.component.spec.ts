import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreferenceComponent } from './form-preference.component';

describe('FormPreferenceComponent', () => {
  let component: FormPreferenceComponent;
  let fixture: ComponentFixture<FormPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
