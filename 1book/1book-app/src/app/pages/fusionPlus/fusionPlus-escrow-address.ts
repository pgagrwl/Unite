import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getExplorerUrlAddress } from '../../utils/explorerLinks';
import { BaseUrl } from '../../utils/config';

@Component({
  selector: 'app-fusion-escrow',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fusionPlus-escrow-address.html',
})
export class FusionPlusEscrowComponent implements OnInit {
  escrowData: any = null;
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
    this.http.get(`${BaseUrl}/fusion-plus/escrow-addresses`).subscribe({
      next: (res: any) => {
        this.escrowData = res;
        this.loading = false;
      },
      error: () => {
        this.escrowData = { result: [] };
        this.loading = false;
      },
    });
  }

  getExplorerUrl(chainId: number, address: string): string {
    return getExplorerUrlAddress(chainId, address);
  }
}
