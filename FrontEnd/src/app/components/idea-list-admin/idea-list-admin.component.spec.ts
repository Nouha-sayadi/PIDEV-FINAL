import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaListAdminComponent } from './idea-list-admin.component';

describe('IdeaListAdminComponent', () => {
  let component: IdeaListAdminComponent;
  let fixture: ComponentFixture<IdeaListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaListAdminComponent]
    });
    fixture = TestBed.createComponent(IdeaListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
