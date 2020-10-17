import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { CabeceraInicioComponent } from './componentes/cabecera-inicio/cabecera-inicio.component';
import { SplashAnimacionPage } from './splash-animacion/splash-animacion.page';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CosasFeasComponent } from './componentes/cosas-feas/cosas-feas.component';
import { CosasLindasComponent } from './componentes/cosas-lindas/cosas-lindas.component';

@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    RegistroComponent, 
    CabeceraInicioComponent, 
    SplashAnimacionPage,
    PrincipalComponent,
    CosasFeasComponent,
    CosasLindasComponent,
  ],
  entryComponents: [SplashAnimacionPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
