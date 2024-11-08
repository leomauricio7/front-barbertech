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
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [HomePage, NotfoundPage, SchedulingPage],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModule,
  ],
  providers: [ApiService, AuthService],
  exports: [HomePage, NotfoundPage, SchedulingPage],
})
export class PagesModule {}
