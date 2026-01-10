import { Routes } from '@angular/router';
import { TableProducts} from './pages/table-products/table-products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path:"dashboard", component: DashboardComponent},
    {path:"produtos", component: TableProducts}

];
