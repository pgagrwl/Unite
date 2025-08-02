import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WalletService } from '../../components/wallet-connect/wallet-connect.service';
import { FormsModule } from '@angular/forms';
import { ethers } from 'ethers';
import { getExplorerUrlAddress } from '../../utils/explorerLinks';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  portfolioData: any[] = [];
  portfolioFilter: string = '';
  address: string | null = null;
  manualAddress: string = '';
  loading = false;

  filters = {
    network: '',
    symbol: '',
    name: '',
  };

  currency = 'USD';
  currencies = [];

  sortKey = '';
  sortAsc = true;

  uniqueNetworks: string[] = [];

  constructor(private walletService: WalletService, private http: HttpClient) {}
  ngOnInit(): void {
    this.supportedCurrencies();
  }

  async connectWallet() {
    if ((window as any).ethereum) {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      this.address = accounts[0];
      this.manualAddress = '';
    } else {
      alert('MetaMask not detected!');
    }
  }

  portfolio() {
    const targetAddress = this.manualAddress || this.address;
    if (!targetAddress) {
      alert('Please connect wallet or enter address');
      return;
    }

    this.loading = true;
    this.http
      .get(
        `http://localhost:3000/balance/all-token-balance?address=${targetAddress}&currency=${this.currency}`
      )
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res?.success) {
            this.portfolioData = res.result;
            this.extractUniqueNetworks();
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Failed to fetch portfolio', err);
        },
      });
  }

  extractUniqueNetworks() {
    const networks = new Set<string>();
    for (const token of this.portfolioData) {
      networks.add(token.network);
    }
    this.uniqueNetworks = Array.from(networks);
  }

  getFilteredTokens() {
    return this.portfolioData.filter((token: any) => {
      const matchNetwork =
        !this.filters.network || token.network === this.filters.network;
      const matchSymbol = token.symbol
        .toLowerCase()
        .includes(this.filters.symbol.toLowerCase());
      const matchName = token.name
        .toLowerCase()
        .includes(this.filters.name.toLowerCase());

      return matchNetwork && matchSymbol && matchName;
    });
  }

  getSortedFilteredTokens() {
    const tokens = this.getFilteredTokens();

    if (!this.sortKey) return tokens;

    return tokens.sort((a, b) => {
      const valA = a[this.sortKey];
      const valB = b[this.sortKey];
      const isNumeric = !isNaN(valA) && !isNaN(valB);
      return this.sortAsc
        ? isNumeric
          ? parseFloat(valA) - parseFloat(valB)
          : valA.localeCompare(valB)
        : isNumeric
        ? parseFloat(valB) - parseFloat(valA)
        : valB.localeCompare(valA);
    });
  }

  setSort(key: string) {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }
  }

  getExplorerUrl(chainId: number, address: string): string {
    return getExplorerUrlAddress(chainId, address);
  }

  exportCSV() {
    const tokens = this.getSortedFilteredTokens();
    if (!tokens.length) {
      alert('No data to export');
      return;
    }

    const headers = [
      'Symbol',
      'Name',
      'Network',
      'Balance',
      `Value (${this.currency})`,
      'Address',
    ];

    const rows = tokens.map((t: any) => [
      t.symbol,
      t.name,
      t.network,
      t.balance,
      t.value,
      t.address,
    ]);

    const csvContent = [headers, ...rows]
      .map((e) => e.map((x: any) => `"${x}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `portfolio-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  supportedCurrencies() {
    this.http.get(`http://localhost:3000/balance/currencies`).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res?.success) {
          this.currencies = res.result;
          console.log(this.currencies);
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to fetch currencies', err);
      },
    });
  }
}
