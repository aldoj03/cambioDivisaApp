import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {

    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {

    path: 'list-cambios',
    loadChildren: () => import('./list-cambios/list-cambios.module').then(m => m.ListCambiosPageModule)
  },
  {
    canActivate: [AuthGuardGuard],

    path: 'config',
    loadChildren: () => import('./config/config.module').then(m => m.ConfigPageModule)
  },
  {
    canActivate: [AuthGuardGuard],

    path: 'set-cambios',
    loadChildren: () => import('./set-cambios/set-cambios.module').then(m => m.SetCambiosPageModule)
  },



  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
