import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface StarWarsFact {
  title: string;
  content: string;
}

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit {
  facts: StarWarsFact[] = [];
  currentFact: StarWarsFact | null = null;
  currentIndex = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<StarWarsFact[]>('/assets/facts.json')
      .subscribe(data => {
        this.facts = data;
      });
  }

  showFact(): void {
    if (this.currentIndex >= this.facts.length) {
      this.currentIndex = 0;
    }

    this.currentFact = this.facts[this.currentIndex];
    this.currentIndex++;
  }
}