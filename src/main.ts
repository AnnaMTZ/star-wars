import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/compiler';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

export class MyComponent {
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get('/api/data');
  }
}