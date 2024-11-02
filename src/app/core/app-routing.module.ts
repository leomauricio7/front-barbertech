import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundPage } from '../pages/notfound/notfound.page';
import { HomePage } from '../pages/home/home.page';
import { SchedulingPage } from '../pages/scheduling/scheduling.page';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'search', component: HomePage },
  { path: 'notfound', component: NotfoundPage },
  { path: 'scheduling', component: SchedulingPage },
  { path: '**', component: NotfoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
