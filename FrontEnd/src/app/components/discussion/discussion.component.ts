// discussion.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdeaService } from 'src/app/services/idea.service';
import { Discussion } from 'src/app/models/idea.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  ideaId!: number;
  message: string = '';
  discussions: Discussion[] = [];

  constructor(
    private route: ActivatedRoute,
    private ideaService: IdeaService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ideaId = +id;
        this.loadDiscussions();
      } else {
        console.error('ID de l\'idée non trouvé dans l\'URL');
      }
    });
  }

  sendMessage() {
  const token = localStorage.getItem('token');
  console.log('Token envoyé:', token);

  if (!token) {
    console.error('Pas de token JWT trouvé dans localStorage');
    return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.post(`http://localhost:8081/api/ideas/${this.ideaId}/discussions`, { message: this.message }, { headers })
    .subscribe({
      next: () => {
        this.message = '';
        this.loadDiscussions();
      },
      error: (err) => {
        console.error("Erreur d'envoi", err);
      }
    });
}

  loadDiscussions(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token manquant, veuillez vous connecter.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Discussion[]>(`http://localhost:8081/api/ideas/${this.ideaId}/discussions`, { headers })
      .subscribe({
        next: (data) => {
          this.discussions = data;
        },
        error: (error) => {
          console.error('Erreur chargement discussions', error);
        }
      });
  }
}
