// import { Routes } from '@angular/router';
// import { ApiViewComponent } from './components/raw/api-view';
// import { FusionPlusViewComponent } from './components/escrow-list/escrow-view';

// export const routes: Routes = [
//   { path: '', component: ApiViewComponent, pathMatch: 'full' },
//   { path: 'plus', component: FusionPlusViewComponent },
// ];

// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SwapsComponent } from './pages/swaps/swaps';
import { SwapAvailableComponent } from './pages/swaps/swaps-available';
import { SwapLiquidityComponent } from './pages/swaps/swaps-liquidity-sources';
import { SwapTrustesComponent } from './pages/swaps/swaps-trusted-spender';
import { SwapQuotesComponent } from './pages/swaps/swaps-quotes';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'swaps',
    component: SwapsComponent,
    children: [
      { path: 'available-tokens', component: SwapAvailableComponent },
      { path: 'liquidity-sources', component: SwapLiquidityComponent },
      { path: 'trusted-spenders', component: SwapTrustesComponent },
      { path: 'quotes', component: SwapQuotesComponent },
    ],
  },
];
