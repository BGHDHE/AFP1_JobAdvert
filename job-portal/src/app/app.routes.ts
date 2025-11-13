import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegistrationComponent } from './pages/registration/registration';

// export a routes változót
export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'register', component: RegistrationComponent },
<<<<<<< Updated upstream
=======
  {path: 'login', component: Login},
  { path: 'felhasznaloprofil', component: FelhasznaloprofilComponent},
  { path: 'felhasznaloprofil', component: FelhasznaloprofilComponent},
  { path: 'searchjobs', component: SearchJobsComponent}
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
