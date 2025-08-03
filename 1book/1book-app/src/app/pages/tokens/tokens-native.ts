import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { classicSwapChains } from './../../utils/networks';
import { BaseUrl } from '../../utils/config';

@Component({
  selector: 'app-token-native',
  templateUrl: './tokens-native.html',
  styleUrls: ['./tokens-native.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TokensNativeComponent {
  chains = classicSwapChains;
  selectedChainId: number | null = null;
  selectedProvider: string = 'coingecko';
  responseData: any = null;
  loading = false;

  constructor(private http: HttpClient) {}

  fetchChainData(): void {
    if (!this.selectedChainId) return;

    this.loading = true;
    this.http
      .get<any>(
        `${BaseUrl}/tokens/native-token-data?chainId=${this.selectedChainId}?provider=${this.selectedProvider}`
      )
      .subscribe({
        next: (res) => {
          this.responseData = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('API error:', err);
          this.loading = false;
        },
      });
  }
}
