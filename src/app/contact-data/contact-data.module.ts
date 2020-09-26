import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactDataRoutingModule } from './contact-data-routing.module';
import { DataTableComponent } from './data-table/data-table.component';


@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    ContactDataRoutingModule
  ]
})
export class ContactDataModule { }
