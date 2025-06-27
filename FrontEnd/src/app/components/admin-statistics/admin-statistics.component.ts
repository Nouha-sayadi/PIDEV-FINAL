import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../services/idea.service';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {

  stats: any = {};
  loading = true;
  errorMessage = '';

  constructor(private ideaService: IdeaService) { }

  ngOnInit(): void {
    this.ideaService.getStatistics().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des statistiques.';
        this.loading = false;
      }
    });
  }
}
