import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';

const appRoutes: Route[] = [
  {
    path: "",
    loadComponent: () => import("./app/layout/layout.component").then((m) => m.LayoutComponent),
    loadChildren: () => import("./app/layout/layout.routes").then((m) => m.routes),
  },
];

bootstrapApplication(AppComponent, { providers: [provideRouter(appRoutes, withHashLocation())] }).catch((err) =>
  console.log(err)
);
