import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
  ],
  exports:[
    MatToolbarModule,
    MatFormFieldModule
],
})
export class MaterialModule { }
