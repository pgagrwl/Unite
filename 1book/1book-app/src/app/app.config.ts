import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Import the routes

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes), // Use the routes from app.routes.ts
  ],
};
