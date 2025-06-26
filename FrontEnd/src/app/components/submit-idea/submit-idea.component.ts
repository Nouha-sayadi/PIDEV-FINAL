import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../models/idea.model';

@Component({
  selector: 'app-submit-idea',
  templateUrl: './submit-idea.component.html',
  styleUrls: ['./submit-idea.component.css']
})
export class SubmitIdeaComponent {
  newIdea: Idea = {
    title: '',
    status: 'PROPOSED',
    likes: 0,
    submissionDate: new Date().toISOString(),
    reportFileName: ''
  };

  selectedFile?: File;  // Ajouté
  message = '';
  errorMessage = '';

  constructor(private ideaService: IdeaService, private router: Router) {}

  submitIdea() {
    if (!this.newIdea.title.trim()) {
      this.errorMessage = "Le titre de l'idée est requis.";
      this.message = '';
      return;
    }

    this.ideaService.create(this.newIdea).subscribe({
      next: (savedIdea) => {
        this.message = "Votre idée a été soumise avec succès !";
        this.errorMessage = '';

        if (this.selectedFile) {
          this.uploadReport(savedIdea.id!, this.selectedFile);
        }

        this.newIdea = {
          title: '',
          status: 'PROPOSED',
          likes: 0,
          submissionDate: new Date().toISOString(),
          reportFileName: ''
        };
      },
      error: () => {
        this.errorMessage = "Erreur lors de la soumission de l'idée.";
        this.message = '';
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadReport(ideaId: number, file: File) {
    this.ideaService.uploadReport(ideaId, file).subscribe({
      next: () => alert('Rapport uploadé avec succès'),
      error: () => alert('Erreur lors de l\'upload')
    });
  }
}
