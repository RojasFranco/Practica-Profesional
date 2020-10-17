import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SalonAComponent } from './componentes/salon-a/salon-a.component';
import { SalonBComponent } from './componentes/salon-b/salon-b.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'splash-animacion',
    loadChildren: () => import('./splash-animacion/splash-animacion.module').then( m => m.SplashAnimacionPageModule)
  },
  {path:'principal', component: PrincipalComponent},
  {path: 'salon-a', component: SalonAComponent},
  {path: 'salon-b', component: SalonBComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
