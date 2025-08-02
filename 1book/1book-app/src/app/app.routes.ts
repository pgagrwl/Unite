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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'swaps', component: SwapsComponent },
];
