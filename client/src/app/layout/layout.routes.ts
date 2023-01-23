import { Route } from '@angular/router';


export const routes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () => import('../dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
]
