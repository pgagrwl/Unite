import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-swap-sources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './swaps-liquidity-sources.html',
  styleUrl: './swaps.scss',
})
export class SwapLiquidityComponent implements OnInit {
  sourcesData: any = null;
  uniqueNetworks: string[] = [];

  filters = {
    network: '',
    title: '',
  };

  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSources();
  }

  fetchSources() {
    this.loading = true;
    this.http.get('http://localhost:3000/swaps/liquidity-sources').subscribe({
      next: (res: any) => {
        this.sourcesData = res;
        this.extractUniqueNetworks();
        this.loading = false;
      },
      error: () => {
        this.sourcesData = { result: [] };
        this.loading = false;
      },
    });
  }

  extractUniqueNetworks() {
    const networks = new Set<string>();
    for (const chain of this.sourcesData?.result || []) {
      networks.add(chain.network);
    }
    this.uniqueNetworks = Array.from(networks);
  }

  getFilteredSources() {
    if (!this.sourcesData?.result) return [];

    return this.sourcesData.result
      .filter((chain: any) => {
        return (
          this.filters.network === '' || chain.network === this.filters.network
        );
      })
      .flatMap((chain: any) =>
        chain.sources
          .filter((src: any) =>
            src.title.toLowerCase().includes(this.filters.title.toLowerCase())
          )
          .map((src: any) => ({
            ...src,
            network: chain.network,
            chainId: chain.chainId,
          }))
      );
  }
}
