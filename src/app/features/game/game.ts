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

  showWelcome: boolean = true;
  showGoodbyeMessage: boolean = false;
  gameVisible = true;

  factPrefix: string = '';

  isLastFact = false;
 showLastFactMessage = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<StarWarsFact[]>('/assets/facts.json')
      .subscribe(data => {
        this.facts = data;
      });
  }

  startGame(): void {
    this.showWelcome = false;
    this.showFact();
  }

  declineGame(): void {
    this.showWelcome = false;
    this.showGoodbyeMessage = true;

    setTimeout(() => {
      this.showGoodbyeMessage = false;
    }, 5000);
  }

showFact(): void {
  if (!this.facts.length) {
    return;
  }

  if (this.currentIndex >= this.facts.length) {
    this.currentIndex = 0;
  }

  this.currentFact = this.facts[this.currentIndex];
  this.factPrefix = 'Did you know that...';

  // Check if this is the last fact
  this.isLastFact = this.currentIndex === this.facts.length - 1;

  this.currentIndex++;
}

nextFact(): void {
  if (this.isLastFact) {
    this.currentFact = null;
    this.showLastFactMessage = true;
    return;
  }

  this.showFact();
}

doneWithFacts(): void {
  this.gameVisible = false;
}

  
}
