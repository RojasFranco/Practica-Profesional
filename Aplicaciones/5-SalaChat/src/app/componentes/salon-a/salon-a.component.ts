import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-salon-a',
  templateUrl: './salon-a.component.html',
  styleUrls: ['./salon-a.component.scss'],
})
export class SalonAComponent implements OnInit {

  coleccion = "mensajes-salon-a";
  listaMensajes: Array<any>;
  mailUsuarioActual: string;
  mensajeNuevo: string;
  alineacion: string;
  constructor(private service: FirebaseService, private auth: AutenticacionService, private router: Router) { 
    this.listaMensajes = new Array<any>();
  }

  async ngOnInit() {
    let usuario = await this.auth.ObtenerUsuarioActual();
    this.mailUsuarioActual = usuario.email;

    this.service.ObtenerTodos(this.coleccion).subscribe(snap=>{
      this.listaMensajes = [];
      snap.forEach(element => {        
        let mensaje = {
          usuario: element.payload.doc.get("usuario"),
          mensaje: element.payload.doc.get("mensaje"),
          fecha: element.payload.doc.get("fecha_hora"),
          time: element.payload.doc.get("tiempo")
        }
        this.listaMensajes.push(mensaje);
      });
      //    TENGO QUE ORDENAR DE MENOR A MAYOR
      this.listaMensajes= this.listaMensajes.sort(this.OrdenarPorTiempo);
    });
  }

  OrdenarPorTiempo(a,b){
    if(a.time<b.time){
      return -1;
    }
    else if(a.time>b.time){
      return 1;
    }
    return 0;
  }

  async AgregarMje(){
    let date = new Date();
    let mensajeGuardar = {
      usuario: this.mailUsuarioActual,
      mensaje: this.mensajeNuevo,
      tiempo: date.getTime(),
      fecha_hora: this.convertDate(date)+'  '+ this.converHours(date)+'hs',
    };
    await this.service.AgregarDatoSinnId(this.coleccion, mensajeGuardar);
    this.mensajeNuevo="";
  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  converHours(inputFormat){
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getHours()), pad(d.getMinutes())].join(':')
  }

  Volver(){
    this.router.navigate(["principal"]);
  }
}
