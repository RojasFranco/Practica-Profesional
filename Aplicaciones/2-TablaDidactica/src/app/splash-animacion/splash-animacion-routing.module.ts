import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { SplashAnimacionPage } from './splash-animacion.page';

const routes: Routes = [
  {
    path: '',
    component: SplashAnimacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, BrowserModule],
  exports: [RouterModule],
})
export class SplashAnimacionPageRoutingModule {}
