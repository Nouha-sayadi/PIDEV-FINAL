import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitIdeaComponent } from './submit-idea.component';

describe('SubmitIdeaComponent', () => {
  let component: SubmitIdeaComponent;
  let fixture: ComponentFixture<SubmitIdeaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitIdeaComponent]
    });
    fixture = TestBed.createComponent(SubmitIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
