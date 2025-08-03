import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getExplorerBlockUrl } from '../../utils/explorerLinks';
import { BaseUrl } from '../../utils/config';

@Component({
  selector: 'app-chain-block',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chain-sync-block.html',
})
export class ChainBlockComponent implements OnInit {
  blocksData: any = null;
  uniqueNetworks: string[] = [];

  filters = {
    network: '',
    title: '',
  };

  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBlocks();
  }

  fetchBlocks() {
    this.loading = true;
    this.http.get(`${BaseUrl}/trace/blocks-data`).subscribe({
      next: (res: any) => {
        this.blocksData = res;
        this.loading = false;
      },
      error: () => {
        this.blocksData = { result: [] };
        this.loading = false;
      },
    });
  }

  getBlockUrl(chainId: number, blockNumber: number): string {
    return getExplorerBlockUrl(chainId, blockNumber);
  }
}
