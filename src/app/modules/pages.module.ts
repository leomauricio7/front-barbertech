import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { NotfoundPage } from '../pages/notfound/notfound.page';
import { SchedulingPage } from '../pages/scheduling/scheduling.page';
import { SharedComponentModule } from './components.module';

@NgModule({
  declarations: [HomePage, NotfoundPage, SchedulingPage],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModule,
  ],
  exports: [HomePage, NotfoundPage, SchedulingPage],
})
export class PagesModule {}
