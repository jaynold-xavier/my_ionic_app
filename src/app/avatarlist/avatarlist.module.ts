import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarlistPageRoutingModule } from './avatarlist-routing.module';

import { AvatarlistPage } from './avatarlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarlistPageRoutingModule
  ],
  declarations: [AvatarlistPage]
})
export class AvatarlistPageModule {}
