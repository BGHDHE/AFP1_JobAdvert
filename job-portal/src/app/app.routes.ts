import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegistrationComponent } from './pages/registration/registration';
import { FelhasznaloprofilComponent } from './pages/felhasznaloprofil/felhasznaloprofil';
import { SearchJobsComponent } from './pages/searchjobs/searchjobs';

// export a routes változót
export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'felhasznaloprofil', component: FelhasznaloprofilComponent}
  { path: 'searchjobs', component: SearchJobsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
