import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  standalone: true,
  template: `
    <h1>Callback Works</h1>
    <p>Check browser console</p>
  `
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    const code =
      this.route.snapshot.queryParamMap.get('code');

    console.log('CODE:', code);

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', 'frontend-app')
      .set('code', code ?? '')
      .set(
        'redirect_uri',
        'http://localhost:4200/auth/callback'
      );

    console.log('STARTING TOKEN REQUEST');

    this.http.post(
      'http://localhost:8080/realms/starwars/protocol/openid-connect/token',
      body.toString(),
      {
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded'
        }
      }
    ).subscribe({
      next: response => {
        console.log('TOKEN SUCCESS', response);
      },
      error: error => {
        console.error('TOKEN ERROR', error);
      }
    });
  }
}