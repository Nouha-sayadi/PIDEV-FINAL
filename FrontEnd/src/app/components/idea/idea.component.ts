import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../models/idea.model';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  ideas: Idea[] = [];
  newIdea: Idea = {
    title: '',
    status: 'PROPOSED',
    likes: 0
  };
  searchKeyword: string = '';
  searchStatus: string = '';

  constructor(private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.loadIdeas();
  }

  loadIdeas(): void {
    this.ideaService.getAll().subscribe(data => {
      this.ideas = data;
    });
  }

  addIdea(): void {
    this.ideaService.create(this.newIdea).subscribe(() => {
      this.loadIdeas();
      this.newIdea = { title: '', status: 'PROPOSED', likes: 0 };
    });
  }

  updateIdea(idea: Idea): void {
    if (idea.id) {
      this.ideaService.update(idea.id, idea).subscribe(() => {
        this.loadIdeas();
      });
    }
  }

  deleteIdea(id?: number): void {
    if (id) {
      this.ideaService.delete(id).subscribe(() => {
        this.loadIdeas();
      });
    }
  }

  searchByTitle(): void {
    this.ideaService.search(this.searchKeyword).subscribe(data => {
      this.ideas = data;
    });
  }

  searchByStatus(): void {
    this.ideaService.getByStatus(this.searchStatus).subscribe(data => {
      this.ideas = data;
    });
  }
}
