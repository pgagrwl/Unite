import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getExplorerUrlAddress } from '../../utils/explorerLinks';
import { BaseUrl } from '../../utils/config';

@Component({
  selector: 'app-fusion-settlement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fusion-settlement-address.html',
  styleUrl: './fusion.scss',
})
export class FusionSettlementComponent implements OnInit {
  settlementData: any = null;
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
    this.http.get(`${BaseUrl}/fusion/settlement-addresses`).subscribe({
      next: (res: any) => {
        this.settlementData = res;
        this.loading = false;
      },
      error: () => {
        this.settlementData = { result: [] };
        this.loading = false;
      },
    });
  }

  getExplorerUrl(chainId: number, address: string): string {
    return getExplorerUrlAddress(chainId, address);
  }
}
