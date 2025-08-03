import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SwapsComponent } from './pages/swaps/swaps';
import { SwapAvailableComponent } from './pages/swaps/swaps-available';
import { SwapLiquidityComponent } from './pages/swaps/swaps-liquidity-sources';
import { SwapTrustesComponent } from './pages/swaps/swaps-trusted-spender';
import { SwapQuotesComponent } from './pages/swaps/swaps-quotes';
import { FusionComponent } from './pages/fusion/fusion';
import { FusionOrdersComponent } from './pages/fusion/fusion-orders';
import { FusionSettlementComponent } from './pages/fusion/fusion-settlement-address';
import { FusionPlusComponent } from './pages/fusionPlus/fusionPlus';
import { FusionPlusEscrowComponent } from './pages/fusionPlus/fusionPlus-escrow-address';
import { FusionPlusOrdersComponent } from './pages/fusionPlus/fusionPlus-orders';
import { TokensComponent } from './pages/tokens/tokens';
import { TokensNativeComponent } from './pages/tokens/tokens-native';
import { TokensContractComponent } from './pages/tokens/tokens-contract';
import { ChainComponent } from './pages/blockchain/chain';
import { ChainBlockComponent } from './pages/blockchain/chain-sync-block';

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
  {
    path: 'fusion',
    component: FusionComponent,
    children: [
      { path: 'settlement-address', component: FusionSettlementComponent },
      { path: 'orders', component: FusionOrdersComponent },
    ],
  },
  {
    path: 'fusion-plus',
    component: FusionPlusComponent,
    children: [
      { path: 'escrow-address', component: FusionPlusEscrowComponent },
      { path: 'orders', component: FusionPlusOrdersComponent },
    ],
  },
  {
    path: 'tokens',
    component: TokensComponent,
    children: [
      { path: 'native', component: TokensNativeComponent },
      { path: 'contract', component: TokensContractComponent },
    ],
  },
  {
    path: 'trace',
    component: ChainComponent,
    children: [{ path: 'blocks', component: ChainBlockComponent }],
  },
];
