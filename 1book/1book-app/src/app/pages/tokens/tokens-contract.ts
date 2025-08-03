import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { classicSwapChains } from './../../utils/networks';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseUrl } from '../../utils/config';

@Component({
  selector: 'app-token-contracts',
  templateUrl: './tokens-contract.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./tokens-contracts.scss'],
})
export class TokensContractComponent {
  chains = classicSwapChains;

  selectedChainId: number | null = null;
  selectedProvider = 'coingecko';
  contractAddress = '';
  responseData: any = null;
  loading = false;

  private debounceTimer: any;

  constructor(private http: HttpClient) {}

  debounceInput(): void {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.fetchTokenData(), 500);
  }

  fetchTokenData(): void {
    if (
      !this.selectedChainId ||
      !this.contractAddress ||
      !this.contractAddress.startsWith('0x') ||
      !this.selectedProvider
    ) {
      return;
    }

    this.loading = true;

    const params = {
      chainId: this.selectedChainId.toString(),
      contractAddress: this.contractAddress,
      provider: this.selectedProvider,
    };

    this.http.get<any>(`${BaseUrl}/tokens/token-data`, { params }).subscribe({
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
