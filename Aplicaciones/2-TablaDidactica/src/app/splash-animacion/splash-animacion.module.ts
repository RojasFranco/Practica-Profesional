import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashAnimacionPageRoutingModule } from './splash-animacion-routing.module';

import { SplashAnimacionPage } from './splash-animacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashAnimacionPageRoutingModule
  ],
  declarations: [SplashAnimacionPage]
})
export class SplashAnimacionPageModule {}
