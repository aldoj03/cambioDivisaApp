import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetCambiosPage } from './set-cambios.page';

const routes: Routes = [
  {
    path: '',
    component: SetCambiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetCambiosPageRoutingModule {}
