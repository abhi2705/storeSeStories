import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllBrandsComponent } from './view-all-brands.component';

describe('ViewAllBrandsComponent', () => {
  let component: ViewAllBrandsComponent;
  let fixture: ComponentFixture<ViewAllBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
