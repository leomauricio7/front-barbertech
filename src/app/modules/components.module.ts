import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../components/modal/modal.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, ModalComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [NavBarComponent, FooterComponent, ModalComponent],
})
export class SharedComponentModule {}
