import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegistrationComponent } from './pages/registration/registration';
import { Login } from './pages/login/login';
import { FelhasznaloprofilComponent } from './pages/felhasznaloprofil/felhasznaloprofil';
import { SearchjobsComponent } from './pages/searchjobs/searchjobs';
import { CompanyMain } from './pages/company-main/company-main';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  {path: 'login', component: Login},
  { path: 'felhasznaloprofil', component: FelhasznaloprofilComponent},
  { path: 'felhasznaloprofil', component: FelhasznaloprofilComponent},
  { path: 'searchjobs', component: SearchjobsComponent},
  {path: 'bejelentkezes',loadComponent: () => import('./bejelentkezes/bejelentkezes').then(m => m.BejelentkezesComponent)},
  {path: 'company-main', component: CompanyMain}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
