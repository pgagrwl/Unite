// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss',
// })
// export class App {
//   protected readonly title = signal('1book-app');
// }

// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ethers } from 'ethers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav
      style="display: flex; justify-content: space-between; align-items: center; background-color: #f2f2f2; padding: 1rem;"
    >
      <div>
        <a routerLink="/" style="margin-right: 1rem;">Home</a>
        <a routerLink="/swaps" style="margin-right: 1rem;">Swaps Data</a>
      </div>
      <div>
        <button (click)="connectWallet()">
          {{
            address
              ? (address | slice : 0 : 6) + '...' + (address | slice : -4)
              : 'Connect Wallet'
          }}
        </button>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  address: string | null = null;

  async connectWallet() {
    if ((window as any).ethereum) {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      this.address = accounts[0];
    } else {
      alert('MetaMask not detected!');
    }
  }
}
