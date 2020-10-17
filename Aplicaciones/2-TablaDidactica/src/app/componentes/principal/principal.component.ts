import { Component, OnInit } from '@angular/core';
import { ListasTodosLosTemas } from 'src/app/clases/listas-todos-los-temas';
import { ManejadorAudioService } from 'src/app/servicios/manejador-audio.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  bndEspaniol = "../../assets/banderaEspaniol.png";
  bndIngles = "../../assets/banderaIngles.jpg";
  bndPortugues = "../../assets/banderPortuges.png";
  imgBanderaElegida: string;

  todosLosAnimales: Array<any>;
  todosLosColores: Array<any>;
  todosLosNumeros: Array<any>;
  idiomaSeleccionado: string; //al hijo
  // temaPedido: string; //al hijo
  listaElegida: Array<any>; // esto le pasa al hijo 'animales' esta mal nombrado TO DO
  constructor(private manejadorAudio: ManejadorAudioService) { 
    this.CargarTemas();
    this.listaElegida = new Array<any>();
    this.listaElegida = this.todosLosAnimales;
    this.idiomaSeleccionado = "espaniol";
    this.imgBanderaElegida = this.bndEspaniol;
  }

  ngOnInit() {
    this.manejadorAudio.CargarAudiosIdiomaTema(this.idiomaSeleccionado);
  }

  CargarTemas(){
    let listas = new ListasTodosLosTemas();
    this.todosLosAnimales = listas.todosLosAnimales;
    this.todosLosColores = listas.todosLosColores;
    this.todosLosNumeros = listas.todosLosNumeros;
  }

  Elegir(tipoElegido){
    // this.temaPedido = tipoElegido;
    switch (tipoElegido) {
      case 'animales':
        this.listaElegida = this.todosLosAnimales;
        break;
      case 'colores':
        this.listaElegida = this.todosLosColores;
          break;
      case 'numeros':
        this.listaElegida = this.todosLosNumeros;
        break;
      default:
        break;
    }
  }

  ElegirIdioma(idiomaElegido){
    this.manejadorAudio.EliminarReferencia(this.idiomaSeleccionado);
    this.idiomaSeleccionado = idiomaElegido;
    this.manejadorAudio.CargarAudiosIdiomaTema(this.idiomaSeleccionado);
    switch (idiomaElegido) {
      case "espaniol":
        this.imgBanderaElegida = this.bndEspaniol;
        break;
      case "ingles":
        this.imgBanderaElegida = this.bndIngles;
        break;
      default:
        this.imgBanderaElegida = this.bndPortugues;
        break;
    }
  }

  Reproducir(elementoReproducir: string){
    this.manejadorAudio.ReproducirAudio(this.idiomaSeleccionado, elementoReproducir);
  }

}
