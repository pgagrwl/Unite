import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getExplorerUrlAddress } from '../../utils/explorerLinks';

@Component({
  selector: 'app-swap-trusted',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './swaps-trusted-spenders.html',
  styleUrl: './swaps.scss',
})
export class SwapTrustesComponent implements OnInit {
  spendersData: any = null;
  uniqueNetworks: string[] = [];

  filters = {
    network: '',
    title: '',
  };

  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSpenders();
  }

  fetchSpenders() {
    this.loading = true;
    this.http.get('http://localhost:3000/swaps/trusted-spenders').subscribe({
      next: (res: any) => {
        this.spendersData = res;
        this.loading = false;
      },
      error: () => {
        this.spendersData = { result: [] };
        this.loading = false;
      },
    });
  }

  //   extractUniqueNetworks() {
  //     const networks = new Set<string>();
  //     for (const chain of this.spendersData?.result || []) {
  //       networks.add(chain.network);
  //     }
  //     this.uniqueNetworks = Array.from(networks);
  //   }

  //   getFilteredSources() {
  //     if (!this.spendersData?.result) return [];

  //     return this.spendersData.result
  //       .filter((chain: any) => {
  //         return (
  //           this.filters.network === '' || chain.network === this.filters.network
  //         );
  //       })
  //       .flatMap((chain: any) =>
  //         chain.sources
  //           .filter((src: any) =>
  //             src.title.toLowerCase().includes(this.filters.title.toLowerCase())
  //           )
  //           .map((src: any) => ({
  //             ...src,
  //             network: chain.network,
  //             chainId: chain.chainId,
  //           }))
  //       );
  //   }

  getExplorerUrl(chainId: number, address: string): string {
    return getExplorerUrlAddress(chainId, address);
  }
}
