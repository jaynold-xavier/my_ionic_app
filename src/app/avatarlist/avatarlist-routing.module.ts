import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarlistPage } from './avatarlist.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarlistPageRoutingModule {}
