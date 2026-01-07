import { Routes } from '@angular/router';
import { TableProductsDemo } from './pages/table-products-demo/table-products-demo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path:"dashboard", component: DashboardComponent},
    {path:"produtos", component: TableProductsDemo}

];
