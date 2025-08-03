import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { getExplorerTxUrl } from '../../utils/explorerLinks';
import { BaseUrl } from '../../utils/config';

@Component({
  selector: 'app-fusion-orders',
  templateUrl: './fusion-orders.html',
  styleUrls: ['./fusion-orders.scss'],
  imports: [CommonModule, FormsModule, DatePipe, SlicePipe],
})
export class FusionOrdersComponent implements OnInit {
  fusionOrders: any[] = [];
  filteredOrdersList: any[] = [];
  uniqueNetworks: string[] = [];
  uniqueStatuses: string[] = [];
  filters = { network: '', status: '' };

  loading = false;
  currentPage = 1;
  itemsPerPage = 10;
  expandedOrderId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFusionOrders();
  }

  fetchFusionOrders(): void {
    this.loading = true;
    this.http.get<any>(`${BaseUrl}/fusion/fusion-orders`).subscribe({
      next: (res) => {
        this.fusionOrders = res?.data || [];

        this.uniqueNetworks = [
          ...new Set(this.fusionOrders.map((o) => o.network)),
        ];
        this.uniqueStatuses = [
          ...new Set(
            this.fusionOrders
              .flatMap((o) => o.orderStatus.map((s: any) => s.status))
              .filter(Boolean)
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
    const filtered = this.filteredOrders;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return filtered
      .sort((a, b) => {
        const aTime = new Date(
          a.orderStatus[a.orderStatus.length - 1]?.createdAt || ''
        ).getTime();
        const bTime = new Date(
          b.orderStatus[b.orderStatus.length - 1]?.createdAt || ''
        ).getTime();
        return bTime - aTime;
      })
      .slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getExplorerLink(chainId: number, hash: string): string {
    return getExplorerTxUrl(chainId, hash);
  }

  toggleExpand(id: string): void {
    this.expandedOrderId = this.expandedOrderId === id ? null : id;
  }

  hasFills(order: any): boolean {
    return order.orderStatus.some((s: any) => s.fills && s.fills.length > 0);
  }
}
