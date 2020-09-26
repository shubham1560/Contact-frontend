import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevConsoleRoutingModule } from './dev-console-routing.module';
import { ConsoleComponent } from './console.component';


@NgModule({
  declarations: [ConsoleComponent],
  imports: [
    CommonModule,
    DevConsoleRoutingModule
  ]
})
export class DevConsoleModule { }
