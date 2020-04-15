import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriedBlogsComponent } from './storied-blogs.component';

describe('StoriedBlogsComponent', () => {
  let component: StoriedBlogsComponent;
  let fixture: ComponentFixture<StoriedBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriedBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriedBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
