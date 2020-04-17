import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoomarkedBlogsComponent } from './boomarked-blogs.component';

describe('BoomarkedBlogsComponent', () => {
  let component: BoomarkedBlogsComponent;
  let fixture: ComponentFixture<BoomarkedBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoomarkedBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoomarkedBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
