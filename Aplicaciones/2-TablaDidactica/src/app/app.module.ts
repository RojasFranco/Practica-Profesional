import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { SplashAnimacionPage } from './splash-animacion/splash-animacion.page';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './componentes/registrar/registrar.component';

import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AnimalesComponent } from './componentes/animales/animales.component';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@NgModule({
  declarations: [AppComponent,
                 SplashAnimacionPage, 
                 RegistrarComponent,
                PrincipalComponent,
              AnimalesComponent],
  entryComponents: [SplashAnimacionPage],
  imports: [BrowserModule,IonicModule.forRoot(), 
    FormsModule,
    // NativeAudio,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
  providers: [
    StatusBar,
    NativeAudio,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
