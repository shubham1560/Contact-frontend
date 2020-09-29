import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactDataRoutingModule } from './contact-data-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { MaterialModule } from '../shared/material.module';
import { PreferencesComponent } from './preferences/preferences.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';


@NgModule({
  declarations: [DataTableComponent, PreferencesComponent, DeleteConfirmComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactDataRoutingModule,
    MaterialModule
  ]
})
export class ContactDataModule { }
