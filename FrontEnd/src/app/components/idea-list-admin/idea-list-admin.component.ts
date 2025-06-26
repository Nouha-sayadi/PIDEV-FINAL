import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../services/idea.service';
import { Idea, IdeaStatus } from '../../models/idea.model';

@Component({
  selector: 'app-idea-list-admin',
  templateUrl: './idea-list-admin.component.html',
  styleUrls: ['./idea-list-admin.component.css']
})
export class IdeaListAdminComponent implements OnInit {
  ideas: Idea[] = [];
  loading = true;
  errorMessage = '';
  updatingId: number | null = null;

  constructor(private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.loadAllIdeas();
  }

  loadAllIdeas() {
    this.ideaService.getAll().subscribe({
      next: (data) => {
        this.ideas = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des idées.';
        this.loading = false;
      }
    });
  }

updateStatus(idea: Idea, newStatus: IdeaStatus) {
  if (!idea.id) return;

  this.updatingId = idea.id;

  this.ideaService.updateStatus(idea.id, newStatus).subscribe({
    next: (updatedIdea) => {
      idea.status = updatedIdea.status;
      this.updatingId = null;
    },
    error: () => {
      alert('Erreur lors de la mise à jour du statut.');
      this.updatingId = null;
    }
  });
}


   deleteIdea(idea: Idea) {
    if (idea.id && confirm(`Voulez-vous vraiment supprimer l'idée "${idea.title}" ?`)) {
      this.ideaService.delete(idea.id).subscribe({
        next: () => {
          this.ideas = this.ideas.filter(i => i.id !== idea.id);
        },
        error: () => {
          alert('Erreur lors de la suppression de l\'idée.');
        }
      });
    }
  }



}
