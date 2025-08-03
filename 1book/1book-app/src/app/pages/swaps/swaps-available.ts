import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getExplorerUrlAddress } from '../../utils/explorerLinks';
import { BaseUrl } from '../../utils/config';

@Component({
  selector: 'app-swaps-available',
  imports: [CommonModule, FormsModule],
  templateUrl: './swaps-available.html',
  styleUrl: './swaps.scss',
})
export class SwapAvailableComponent implements OnInit {
  data: any;
  swapData: any;
  loading = false;
  swapLoading = false;
  filters = {
    network: '',
    symbol: '',
    name: '',
  };

  uniqueNetworks: string[] = [];

  address: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.availableSwaps();
  }

  availableSwaps() {
    this.swapLoading = true;
    this.http.get(`${BaseUrl}/swaps/available-swap-tokens`).subscribe({
      next: (res) => {
        this.swapData = res;
        this.swapLoading = false;
        this.extractUniqueNetworks();
      },
      error: (err) => {
        this.swapData = { error: 'Failed to fetch data' };
        this.swapLoading = false;
      },
    });
  }

  getExplorerUrl(chainId: number, address: string): string {
    return getExplorerUrlAddress(chainId, address);
  }

  extractUniqueNetworks() {
    const networks = new Set<string>();
    for (const chain of this.swapData.result) {
      networks.add(chain.network);
    }
    this.uniqueNetworks = Array.from(networks);
  }

  getAllFilteredTokens() {
    if (!this.swapData?.result) return [];

    return this.swapData.result
      .flatMap((chain: any) =>
        chain.data.map((token: any) => ({
          ...token,
          network: chain.network,
          chainId: chain.chainId,
        }))
      )
      .filter((token: any) => {
        const matchNetwork =
          this.filters.network === '' || token.network === this.filters.network;
        const matchSymbol = token.symbol
          .toLowerCase()
          .includes(this.filters.symbol.toLowerCase());
        const matchName = token.name
          .toLowerCase()
          .includes(this.filters.name.toLowerCase());
        return matchNetwork && matchSymbol && matchName;
      });
  }
}
