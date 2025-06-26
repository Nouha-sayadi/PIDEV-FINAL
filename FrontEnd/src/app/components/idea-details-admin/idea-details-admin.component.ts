import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../models/idea.model';

@Component({
  selector: 'app-idea-details-admin',
  templateUrl: './idea-details-admin.component.html',
  styleUrls: ['./idea-details-admin.component.css']
})
export class IdeaDetailsAdminComponent implements OnInit {
  idea: Idea | null = null;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private ideaService: IdeaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.ideaService.getById(id).subscribe({
        next: (data) => this.idea = data,
        error: () => this.errorMessage = 'Erreur lors du chargement des détails.'
      });
    } else {
      this.errorMessage = 'ID invalide';
    }
  }
downloadReport() {
  if (!this.idea?.id) {
    alert("L'idée est introuvable ou n'a pas d'ID valide.");
    return;
  }

  this.ideaService.downloadReport(this.idea.id).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.idea?.reportFileName || 'rapport.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error('Erreur lors du téléchargement du rapport', err);
      alert('Erreur lors du téléchargement du rapport.');
    }
  });
}

}
