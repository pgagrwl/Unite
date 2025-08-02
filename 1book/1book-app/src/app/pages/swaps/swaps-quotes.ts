import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getExplorerUrlAddress } from '../../utils/explorerLinks';
import { classicSwapChains } from './../../utils/networks';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-swap-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './swaps-quotes.html',
  styleUrl: './swaps.scss',
})
export class SwapQuotesComponent implements OnInit {
  selectedChain: string = '';
  bestData: any = null;
  uniqueNetworks: string[] = [];

  chains: string[] = [];
  tokenList: any = [];
  uniqueSrcTokens: any[] = [];
  uniqueDstTokens: any[] = [];

  form = {
    chain: '',
    chainId: 0,
    srcToken: '',
    srcTokenAddress: '',
    srcDecimals: 0,
    dstToken: '',
    dstTokenAddress: '',
    amount: 0,
  };

  filters = {
    network: '',
    title: '',
  };

  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    this.getChains();
    await this.fetchTokenList();
    this.extractUniqueSrcTokens();
  }

  getChains() {
    this.chains = classicSwapChains.map((c) => c.network);
  }

  async fetchTokenList() {
    if (!this.form.chain) return;

    const chain = classicSwapChains.find((c) => c.network === this.form.chain);
    const id = chain?.id;
    this.loading = true;
    try {
      const res: any = await this.http
        .get(`http://localhost:3000/swaps/tokens-list?chainId=${id}`)
        .toPromise();

      this.tokenList = res?.result[0]?.data || [];
    } catch (e) {
      console.error('Failed to fetch token list');
      this.tokenList = [];
    } finally {
      this.loading = false;
    }
  }

  extractUniqueSrcTokens() {
    const seen = new Set();
    this.uniqueSrcTokens = this.tokenList
      .filter((token: any) => {
        const key = token.symbol;
        if (!seen.has(key)) {
          seen.add(key);
          return true;
        }
        return false;
      })
      .map((t: any) => ({
        symbol: t.symbol,
        name: t.name,
        logo: t.logoURI,
        address: t.address,
        price: t.priceInUSD,
      }));
    this.uniqueSrcTokens = this.uniqueSrcTokens.sort((a, b) =>
      a.symbol.localeCompare(b.symbol)
    );
  }

  updateDstTokens() {
    const srcSymbol = this.form.srcToken;
    const seen = new Set();

    this.uniqueDstTokens = this.tokenList
      .filter((token: any) => {
        return (
          token.symbol !== srcSymbol &&
          !seen.has(token.symbol) &&
          seen.add(token.symbol)
        );
      })
      .map((t: any) => ({
        symbol: t.symbol,
        name: t.name,
        logo: t.logoURI,
        address: t.address,
        price: t.priceInUSD,
      }));

    this.uniqueDstTokens = this.uniqueDstTokens.sort((a, b) =>
      a.symbol.localeCompare(b.symbol)
    );
  }

  onSubmit() {
    console.log('Form Data:', this.form);
  }

  bestQuote() {
    this.loading = true;

    const { srcTokenAddress, dstTokenAddress, amount, srcDecimals, chainId } =
      this.form;

    const rawAmount = (amount * Math.pow(10, srcDecimals)).toLocaleString(
      'fullwide',
      { useGrouping: false }
    );

    const params = new HttpParams()
      .set('srcAsset', srcTokenAddress)
      .set('dstAsset', dstTokenAddress)
      .set('amount', rawAmount)
      .set('chainId', chainId.toString());

    this.http
      .get('http://localhost:3000/swaps/best-quote', { params })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.bestData = res;
          this.loading = false;
        },
        error: () => {
          this.bestData = { result: [] };
          this.loading = false;
        },
      });
  }

  getExplorerUrl(chainId: number, address: string): string {
    return getExplorerUrlAddress(chainId, address);
  }
  async onChainChange() {
    await this.fetchTokenList();
    this.extractUniqueSrcTokens();
    this.form.srcToken = '';
    this.form.dstToken = '';
    this.uniqueDstTokens = [];

    const selectedChainId = classicSwapChains.find(
      (c) => c.network === this.form.chain
    );
    this.form.chainId = selectedChainId?.id || 0;
  }

  onSrcTokenChange() {
    this.updateDstTokens();

    this.form.dstToken = '';
    this.form.dstTokenAddress = '';

    const selectedSrc = this.tokenList.find(
      (t: any) => t.symbol === this.form.srcToken
    );
    this.form.srcTokenAddress = selectedSrc?.address || '';
    this.form.srcDecimals = selectedSrc?.decimals || 0;
  }

  onDstTokenChange() {
    const selectedDst = this.tokenList.find(
      (t: any) => t.symbol === this.form.dstToken
    );
    this.form.dstTokenAddress = selectedDst?.address || '';
  }

  getTokenName(symbol: string): string {
    const token = this.uniqueSrcTokens.find((t) => t.symbol === symbol);
    return token?.name || '';
  }

  getTokenPrice(symbol: string): string {
    const token = this.uniqueSrcTokens.find((t) => t.symbol === symbol);
    return token?.price || 0;
  }
}
