import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-splash-animacion',
  templateUrl: './splash-animacion.page.html',
  styleUrls: ['./splash-animacion.page.scss'],
})
export class SplashAnimacionPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    SplashScreen.hide();
    setTimeout(() => {
      this.modalCtrl.dismiss();
    }, 4000);
  }

}
