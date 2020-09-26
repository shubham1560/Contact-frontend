import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevConsoleRoutingModule } from './dev-console-routing.module';
import { ConsoleComponent } from './console.component';
import { TablePreferenceComponent } from './table-preference/table-preference.component';
import { FormPreferenceComponent } from './form-preference/form-preference.component';


@NgModule({
  declarations: [ConsoleComponent, TablePreferenceComponent, FormPreferenceComponent],
  imports: [
    CommonModule,
    DevConsoleRoutingModule
  ]
})
export class DevConsoleModule { }
