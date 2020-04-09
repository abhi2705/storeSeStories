import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsTabComponent } from './brands-tab.component';

describe('BrandsTabComponent', () => {
  let component: BrandsTabComponent;
  let fixture: ComponentFixture<BrandsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
