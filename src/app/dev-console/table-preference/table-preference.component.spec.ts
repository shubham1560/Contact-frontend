import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePreferenceComponent } from './table-preference.component';

describe('TablePreferenceComponent', () => {
  let component: TablePreferenceComponent;
  let fixture: ComponentFixture<TablePreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
