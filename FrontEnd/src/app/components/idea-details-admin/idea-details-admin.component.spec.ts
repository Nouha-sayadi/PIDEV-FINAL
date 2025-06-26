import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaDetailsAdminComponent } from './idea-details-admin.component';

describe('IdeaDetailsAdminComponent', () => {
  let component: IdeaDetailsAdminComponent;
  let fixture: ComponentFixture<IdeaDetailsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaDetailsAdminComponent]
    });
    fixture = TestBed.createComponent(IdeaDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
