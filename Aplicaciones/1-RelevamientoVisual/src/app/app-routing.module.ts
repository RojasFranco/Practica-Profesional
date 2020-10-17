import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CosasFeasComponent } from './componentes/cosas-feas/cosas-feas.component';
import { CosasLindasComponent } from './componentes/cosas-lindas/cosas-lindas.component';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { path:'login', component: LoginComponent },
  { path:'registro', component: RegistroComponent},
  { path:'principal', component: PrincipalComponent},
  { path: 'cosas-lindas', component: CosasLindasComponent},
  {path: 'cosas-feas', component: CosasFeasComponent},

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'splash-animacion',
    loadChildren: () => import('./splash-animacion/splash-animacion.module').then( m => m.SplashAnimacionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
