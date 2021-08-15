import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartDayComponent } from './components/start-day/start-day.component';

const routes: Routes = [
  {path: 'start-day', component: StartDayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
