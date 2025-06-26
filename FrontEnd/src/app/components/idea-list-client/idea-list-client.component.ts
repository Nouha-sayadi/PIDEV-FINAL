import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../models/idea.model';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-idea-list-client',
  templateUrl: './idea-list-client.component.html',
  styleUrls: ['./idea-list-client.component.css']
})
export class IdeaListClientComponent implements OnInit {
  ideas: Idea[] = [];
  filteredIdeas: Idea[] = [];
  loading = true;
  errorMessage = '';
  searchTerm = '';

  constructor(private ideaService: IdeaService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.ideaService.getByStatus('ACCEPTED').subscribe({
      next: (data) => {
        this.ideas = data;
        this.filteredIdeas = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des idées acceptées.';
        this.loading = false;
      }
    });
  }

  filterIdeas(): void {
  const term = this.searchTerm.toLowerCase();
  this.ideaService.search(term).subscribe({
    next: (data) => {
      this.filteredIdeas = data;
    },
    error: () => {
      console.error('Erreur lors de la recherche.');
    }
  });
}

  goToSubmitIdea(): void {
    this.router.navigate(['/submitIdea']);
  }

  likeIdea(idea: Idea): void {
  if (!idea.id) {
    console.error("Impossible de liker une idée sans id");
    return;
  }

  this.ideaService.likeIdea(idea.id).subscribe({
  next: (updatedIdea) => {
    idea.likes = updatedIdea.likes;
  },
  error: () => {
    console.error("Erreur lors du like");
  }
});
}

  goToDiscussion(idea: Idea): void {
    this.router.navigate(['/discussion', idea.id]);
  }
sanitizeUrl(url: string): SafeResourceUrl {
  const embedUrl = this.transformToEmbedUrl(url);
  return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
}

transformToEmbedUrl(url: string): string {
  if (!url) return '';
  // Si c'est déjà un embed, on laisse
  if (url.includes('embed')) return url;
  
  // Transforme un lien standard
  const match = url.match(/v=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url; // fallback si pas de correspondance
}
downloadReport(idea: Idea): void {
  if (idea.id) {
    this.ideaService.downloadReport(idea.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = idea.reportFileName || 'rapport.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    }, () => {
      console.error("Erreur lors du téléchargement du rapport");
    });
  }
}

}
