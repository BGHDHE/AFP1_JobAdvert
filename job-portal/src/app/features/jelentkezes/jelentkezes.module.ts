import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JelentkezesiUrlapComponent } from './jelentkezesi-urlap.component';
import { JelentkezesService } from './jelentkezes.service';

@NgModule({
  declarations: [
    JelentkezesiUrlapComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    JelentkezesiUrlapComponent
  ],
  providers: [
    JelentkezesService
  ]
})
export class JelentkezesModule { }
