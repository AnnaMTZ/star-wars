import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Film {
  title: string;
  episode_id: number;
  release_date: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class Landing {
  private http = inject(HttpClient);

  films: Film[] = [];

  ngOnInit() {
    this.http
      .get<{ results: Film[] }>('https://swapi.dev/api/films/')
      .subscribe(response => {
        this.films = response.results.sort(
          (a, b) => a.episode_id - b.episode_id
        );
      });
  }

  toSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }
}