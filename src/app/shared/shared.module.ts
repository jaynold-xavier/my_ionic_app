import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPipe } from './filters/customer.pipe';

@NgModule({
  declarations: [CustomerPipe],
  imports: [
    CommonModule
  ],
  exports: [CustomerPipe]
})
export class SharedModule { }
