import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-escrow-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 1rem;">
      <h2>Escrow Data</h2>
      <button (click)="fetchEscrowData()">Fetch Escrow Data</button>
      <div *ngIf="loading">Loading...</div>
      <pre *ngIf="data">{{ data | json }}</pre>
    </div>
  `,
})
export class FusionPlusViewComponent implements OnInit {
  data: any;
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchEscrowData() {
    this.loading = true;
    this.http
      .get('http://localhost:3000/fusion-plus/escrow-addresses')
      .subscribe({
        next: (res) => {
          this.data = res;
          this.loading = false;
        },
        error: (err) => {
          this.data = { error: 'Failed to fetch data' };
          this.loading = false;
        },
      });
  }
}
