import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevConsoleRoutingModule } from './dev-console-routing.module';
import { ConsoleComponent } from './console.component';
import { ApiDetailComponent } from './api-detail/api-detail.component';
import { FormIntegrationComponent } from './form-integration/form-integration.component';


@NgModule({
  declarations: [ConsoleComponent, ApiDetailComponent, FormIntegrationComponent],
  imports: [
    CommonModule,
    DevConsoleRoutingModule
  ]
})
export class DevConsoleModule { }
