import { Injectable } from '@angular/core';
import { ListasTodosLosTemas } from '../clases/listas-todos-los-temas';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root'
})
export class ManejadorAudioService {

  // idiomaEspaniol = "espaniol";
  // idiomaIngles = "ingles";
  // idiomaPortugues = "portugues";
  animales;
  numeros;
  colores;
  listaCompleta;
  constructor(private audio: AudioService) { 
    this.listaCompleta = new ListasTodosLosTemas();
    this.animales = this.listaCompleta.todosLosAnimales;
    this.colores = this.listaCompleta.todosLosColores;
    this.numeros = this.listaCompleta.todosLosNumeros;
  }

  CargarAudios(){
  }

  CargarAudiosIdiomaTema(idioma: string){
    this.animales.forEach(element => {
      this.audio.preload(idioma+element.tipo, 'assets/audios/animales/'+idioma+'/'+element.tipo+'.mp3');
    });
    this.colores.forEach(element => {
      this.audio.preload(idioma+element.tipo, 'assets/audios/colores/'+idioma+'/'+element.tipo+'.mp3');
    });
    this.numeros.forEach(element => {
      this.audio.preload(idioma+element.tipo, 'assets/audios/numeros/'+idioma+'/'+element.tipo+'.mp3');
    });
  }

  ReproducirAudio(idioma, palabra){
    this.audio.play(idioma+palabra);
  }


  EliminarReferencia(idioma){
    this.animales.forEach(element => {
      this.audio.vaciar(idioma+element.tipo);
    });
    this.colores.forEach(element => {
      this.audio.vaciar(idioma+element.tipo);
    });
    this.numeros.forEach(element => {
      this.audio.vaciar(idioma+element.tipo);
    });
  }

}

    //  ANIMALES

    // this.audio.preload(this.idiomaEspaniol+"perro", '../../assets/audios/animales/espaniol/'+'perro.mp3');
    // this.audio.preload(this.idiomaEspaniol+"gato", '../../assets/audios/animales/espaniol/'+'gato.mp3');
    // this.audio.preload(this.idiomaEspaniol+"leon", '../../assets/audios/animales/espaniol/'+'leon.mp3');
    // this.audio.preload(this.idiomaEspaniol+"loro", '../../assets/audios/animales/espaniol/'+'loro.mp3');
    // this.audio.preload(this.idiomaEspaniol+"pez", '../../assets/audios/animales/espaniol/'+'pez.mp3');

    // this.audio.preload(this.idiomaIngles+"perro", '../../assets/audios/animales/ingles/'+'perro.mp3');
    // this.audio.preload(this.idiomaIngles+"gato", '../../assets/audios/animales/ingles/'+'gato.mp3');
    // this.audio.preload(this.idiomaIngles+"leon", '../../assets/audios/animales/ingles/'+'leon.mp3');
    // this.audio.preload(this.idiomaIngles+"loro", '../../assets/audios/animales/ingles/'+'loro.mp3');
    // this.audio.preload(this.idiomaIngles+"pez", '../../assets/audios/animales/ingles/'+'pez.mp3');

    // this.audio.preload(this.idiomaPortugues+"perro", '../../assets/audios/animales/portugues/'+'perro.mp3');
    // this.audio.preload(this.idiomaPortugues+"gato", '../../assets/audios/animales/portugues/'+'gato.mp3');
    // this.audio.preload(this.idiomaPortugues+"leon", '../../assets/audios/animales/portugues/'+'leon.mp3');
    // this.audio.preload(this.idiomaPortugues+"loro", '../../assets/audios/animales/portugues/'+'loro.mp3');
    // this.audio.preload(this.idiomaPortugues+"pez", '../../assets/audios/animales/portugues/'+'pez.mp3');


        // switch (tema) {
    //   case 'animales':
    //     this.animales.forEach(async(element) => {
    //       await this.audio.preload(this.idiomaEspaniol+element.tipo, 'assets/audios/animales/espaniol/'+element.tipo+'.mp3');
    //       await this.audio.preload(this.idiomaIngles+element.tipo,'assets/audios/animales/ingles/'+element.tipo+'.mp3');
    //       await this.audio.preload(this.idiomaPortugues+element.tipo, 'assets/audios/animales/portugues/'+element.tipo+'.mp3')
    //     });
    //     break;
    //   case 'colores':
    //     this.colores.forEach(async(element) => {
    //       await this.audio.preload(this.idiomaEspaniol+element.tipo, 'assets/audios/colores/espaniol/'+element.tipo+'.mp3');
    //       await this.audio.preload(this.idiomaIngles+element.tipo, 'assets/audios/colores/ingles/'+element.tipo+'.mp3');
    //       await this.audio.preload(this.idiomaPortugues+element.tipo, 'assets/audios/colores/portugues/'+element.tipo+'.mp3');
    //     });
    //     break;
    //   case 'numeros':
    //     this.numeros.forEach(async(element) => {
    //       await this.audio.preload(this.idiomaEspaniol+element.tipo, 'assets/audios/numeros/espaniol/'+element.tipo+'.mp3');
    //       await this.audio.preload(this.idiomaIngles+element.tipo, 'assets/audios/numeros/ingles/'+element.tipo+'.mp3');
    //       await this.audio.preload(this.idiomaPortugues+element.tipo, 'assets/audios/numeros/portugues/'+element.tipo+'.mp3');
    //     });
    //     break;
    //   default:
    //     break;
    // } 