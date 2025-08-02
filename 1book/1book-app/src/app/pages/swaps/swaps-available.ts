import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getExplorerUrlAddress } from '../../utils/explorerLinks';

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
    this.http
      .get('http://localhost:3000/swaps/available-swap-tokens')
      .subscribe({
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

  fetchData() {
    this.loading = true;
    this.http
      .get(
        'http://localhost:3000/swaps/quotes?srcAsset=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&dstAsset=0x111111111117dc0aa78b770fa6a738034120c302&amount=10000000000000000&chainId=1&protocol=BALANCER'
      )
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
