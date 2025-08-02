// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { ApiViewComponent } from './app/components/raw/api-view';
// import { FusionPlusViewComponent } from './app/components/escrow-list/escrow-view';

// bootstrapApplication(ApiViewComponent, appConfig).catch((err) =>
//   console.error(err)
// );

// bootstrapApplication(FusionPlusViewComponent, appConfig).catch((err) =>
//   console.error(err)
// );

// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule)],
});
