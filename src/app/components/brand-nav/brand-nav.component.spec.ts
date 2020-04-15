import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandNavComponent } from './brand-nav.component';

describe('BrandNavComponent', () => {
  let component: BrandNavComponent;
  let fixture: ComponentFixture<BrandNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
