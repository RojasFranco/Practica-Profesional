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
import { CabeceraPrincipalComponent } from './componentes/cabecera-principal/cabecera-principal.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistroComponent, CabeceraPrincipalComponent, PrincipalComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
     FormsModule,    
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFireAuthModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    ScreenOrientation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DeviceMotion,
    Gyroscope,
    Flashlight,
    Vibration
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
