import { Component } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
import { SplashAnimacionPage } from './splash-animacion/splash-animacion.page';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform, private modalCtrl: ModalController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async() => {
      let miSplash = await this.modalCtrl.create({
        component: SplashAnimacionPage
      });
      await miSplash.present();
    });
  }


}
