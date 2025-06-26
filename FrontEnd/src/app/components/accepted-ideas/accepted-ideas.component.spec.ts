import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedIdeasComponent } from './accepted-ideas.component';

describe('AcceptedIdeasComponent', () => {
  let component: AcceptedIdeasComponent;
  let fixture: ComponentFixture<AcceptedIdeasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedIdeasComponent]
    });
    fixture = TestBed.createComponent(AcceptedIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
