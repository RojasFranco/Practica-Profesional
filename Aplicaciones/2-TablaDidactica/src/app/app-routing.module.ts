import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { SplashAnimacionPage } from './splash-animacion/splash-animacion.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registrar', component: RegistrarComponent
  },
  { path: 'principal', component: PrincipalComponent},
  // { path: 'splash', component: SplashAnimacionPage},
  // {
  //   path: 'splash-animacion',
  //   loadChildren: () => import('./splash-animacion/splash-animacion.module').then( m => m.SplashAnimacionPageModule)
  // },
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule, RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
