import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CabeceraInicioComponent } from './componentes/cabecera-inicio/cabecera-inicio.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { SalonAComponent } from './componentes/salon-a/salon-a.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SalonBComponent } from './componentes/salon-b/salon-b.component';

@NgModule({
  declarations: [AppComponent,
     LoginComponent,
    RegistroComponent, 
    CabeceraInicioComponent, 
    PrincipalComponent,
    SalonAComponent,
    SalonBComponent    
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            FormsModule          
          ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
