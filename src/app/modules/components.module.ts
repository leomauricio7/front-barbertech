import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalAuthComponent } from '../components/modal-auth/modal-auth.component';
import { ModalSchedulingComponent } from '../components/modal-scheduling/modal-scheduling.component';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ModalAuthComponent,
    ModalSchedulingComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    NavBarComponent,
    FooterComponent,
    ModalAuthComponent,
    ModalSchedulingComponent,
  ],
})
export class SharedComponentModule {}
