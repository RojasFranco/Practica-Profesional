import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ManejadorAudioService } from 'src/app/servicios/manejador-audio.service';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.scss'],
})
export class AnimalesComponent implements OnInit {

  @Output() eventoReproducirElemento: EventEmitter<string> = new EventEmitter();
  @Input() listaMostrar: Array<any>;
  // @Input() idiomaReproducir: string;
  constructor(public loadingController: LoadingController) {
   }

  async ngOnInit() {
    // await this.manejadorAudio.CargarAudios();
    // this.manejadorAudio.CargarAudiosIdiomaTema(this.idiomaReproducir);
    this.presentLoading();
  }  

  async Elegir(elementoElegido: string){
    // await this.manejadorAudio.ReproducirAudio(this.idiomaReproducir, elementoElegido);      
    //  MANDAR EVENTO
    this.eventoReproducirElemento.emit(elementoElegido);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      duration: 3000,
      spinner: "circles",      
    });
    await loading.present();
  }

}
