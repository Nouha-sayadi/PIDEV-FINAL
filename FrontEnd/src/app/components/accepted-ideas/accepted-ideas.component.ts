import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../models/idea.model';

@Component({
  selector: 'app-accepted-ideas',
  templateUrl: './accepted-ideas.component.html'
})
export class AcceptedIdeasComponent implements OnInit {
  ideas: Idea[] = [];

  constructor(private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.loadAcceptedIdeas();
  }

  loadAcceptedIdeas(): void {
    this.ideaService.getByStatus('ACCEPTED').subscribe(data => {
      this.ideas = data;
    });
  }
}
