import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactDataRoutingModule } from './contact-data-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    ContactDataRoutingModule,
    MaterialModule
  ]
})
export class ContactDataModule { }
