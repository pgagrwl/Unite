import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { getExplorerTxUrl } from '../../utils/explorerLinks';
import { BaseUrl } from '../../utils/config';

@Component({
  selector: 'app-fusion-orders',
  standalone: true,
  templateUrl: './fusionPlus-orders.html',
  styleUrls: ['./fusionPlus-orders.scss'],
  imports: [CommonModule, FormsModule, DatePipe, SlicePipe],
})
export class FusionPlusOrdersComponent implements OnInit {
  fusionOrders: any[] = [];
  filters = { network: '', status: '' };
  uniqueNetworks: string[] = [];
  uniqueStatuses: string[] = [];

  loading = false;
  currentPage = 1;
  itemsPerPage = 10;
  expandedOrderId: string | null = null;
  orderStatus: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFusionOrders();
  }

  fetchFusionOrders(): void {
    this.loading = true;
    this.http.get<any>(`${BaseUrl}/fusion-plus/all-orders`).subscribe({
      next: (res) => {
        this.fusionOrders = res?.data || [];

        this.uniqueNetworks = [
          ...new Set(this.fusionOrders.map((o) => o.network)),
        ];
        this.uniqueStatuses = [
          ...new Set(
            this.fusionOrders.flatMap((o) =>
              o.orderStatus?.map((s: any) => s.status)
            )
          ),
        ];

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.loading = false;
      },
    });
  }

  getOrderStatus(orderHash: string): void {
    this.loading = true;
    this.http
      .get<any>(`${BaseUrl}/fusion-plus/order-status?orderHash=${orderHash}`)
      .subscribe({
        next: (res) => {
          this.orderStatus = res?.result || {};

          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
          this.loading = false;
        },
      });
  }

  get filteredOrders() {
    return this.fusionOrders.filter((order) => {
      const matchesNetwork =
        !this.filters.network || order.network === this.filters.network;

      const allStatuses = order.orderStatus.map((s: any) => s.status);
      const matchesStatus =
        !this.filters.status || allStatuses.includes(this.filters.status);

      return matchesNetwork && matchesStatus;
    });
  }

  get paginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders
      .sort((a, b) => {
        const aTime = new Date(a.orderStatus?.at(-1)?.createdAt || 0).getTime();
        const bTime = new Date(b.orderStatus?.at(-1)?.createdAt || 0).getTime();
        return bTime - aTime;
      })
      .slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  toggleExpand(id: string): void {
    this.expandedOrderId = this.expandedOrderId === id ? null : id;
  }

  hasFills(order: any): boolean {
    return order.orderStatus.some(
      (s: any) => Array.isArray(s.fills) && s.fills.length
    );
  }

  getExplorerLink(chainId: number, hash: string): string {
    return getExplorerTxUrl(chainId, hash);
  }

  getExplorerLinkBySide(
    order: any,
    txHash: string,
    side: 'src' | 'dst'
  ): string {
    const chainId = side === 'src' ? order.srcChainId : order.dstChainId;

    const explorers: { [key: number]: string } = {
      1: 'https://eth.blockscout.com/tx/',
      137: 'https://polygon.blockscout.com/tx/',
      42161: 'https://arbitrum.blockscout.com/tx/',
      10: 'https://explorer.optimism.io/tx/',
      56: 'https://bscscan.com/tx/',
      43114: 'https://snowtrace.io/tx/',
      8453: 'https://base.blockscout.com/tx/',
      324: 'https://zksync.blockscout.com/tx/',
      100: 'https://gnosis.blockscout.com/tx/',
      130: 'https://unichain.blockscout.com/tx/',
      146: 'https://sonicscan.org/tx/',
      59144: 'https://lineascan.build/tx/',
      // Add more chains if needed
    };

    const baseUrl = explorers[chainId] || 'https://etherscan.io/address/';
    return `${baseUrl}${txHash}`;
  }
}
