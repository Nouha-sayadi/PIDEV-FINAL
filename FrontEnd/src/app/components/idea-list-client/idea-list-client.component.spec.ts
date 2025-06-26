import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaListClientComponent } from './idea-list-client.component';

describe('IdeaListClientComponent', () => {
  let component: IdeaListClientComponent;
  let fixture: ComponentFixture<IdeaListClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaListClientComponent]
    });
    fixture = TestBed.createComponent(IdeaListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
