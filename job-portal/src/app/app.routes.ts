import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration';
import { JelentkezesiUrlapComponent } from './features/jelentkezes/jelentkezesi-urlap.component';

// export a routes változót
export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'jelentkezes', component: JelentkezesiUrlapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
