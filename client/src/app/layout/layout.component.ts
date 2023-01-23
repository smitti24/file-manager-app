import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <router-outlet></router-outlet>
  `,
  imports: [RouterModule, DashboardComponent]
})
export class LayoutComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
