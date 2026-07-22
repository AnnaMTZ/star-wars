import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { CommonModule } from '@angular/common';


interface EpisodeFact {
  title: string;
  content: string;
}

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [],
  templateUrl: './episode.html',
  styleUrl: './episode.scss',
})
export class Episode implements OnInit {
  private swapiService = inject(landingService);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  readonly episodeName =
    this.route.snapshot.paramMap.get('movie') ?? '';

  episodeFact?: EpisodeFact;  
  showCrawl = true;
showFilmInfo = false;

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

  planets = rxResource({
    stream: () => this.swapiService.getPlanets(),
  });

  /// might need to check if the film is using the same route

  ngOnInit(): void {
    this.http
      .get<EpisodeFact[]>('/assets/episodes.json')
      .subscribe((facts) => {
        const normalizedEpisodeName = this.episodeName
          .replace(/-/g, ' ')
          .toLowerCase()
          .trim();

        this.episodeFact = facts.find(
          (fact) =>
            fact.title.toLowerCase().trim() ===
            normalizedEpisodeName
        );
      });
  }

onCrawlEnd(): void {
  this.showCrawl = false;
  this.showFilmInfo = true;
}

  get backgroundImage(): string {
    if (!this.episodeName) {
      return '/assets/images/default.jpg';
    }

    const fileName = this.episodeName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    return `/assets/images/${fileName}.jpg`;
  }

  get backgroundStyle(): string {
    return `
      url('${this.backgroundImage}'),
      radial-gradient(circle at top, rgba(255,255,255,.05), transparent 45%),
      linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,.9))
    `;
  }
}