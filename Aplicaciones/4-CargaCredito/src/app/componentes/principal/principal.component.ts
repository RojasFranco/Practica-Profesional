import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  
  esAdmin: boolean;
  mailUsuarioActual: string;
  listaCodigosEscaneadosPorUsuario: Array<any>;
  saldoDeCodigo: number;
  saldoActualUsuario: number;
  constructor(private barcodeScanner: BarcodeScanner,
              private auth: AutenticacionService,
              private alertCtrl: AlertController,
              private firestore: CloudFirestoreService,
              private router: Router,
              public loadingController: LoadingController,
              public toastController: ToastController) { 
    // this.VerificarSiEsAdmin();
    this.presentLoading("Cargando su cuenta...");
    this.CargarDatos();
  }

  ngOnInit() { 
  }

  async CargarDatos(){
    let user = await this.auth.ObtenerActual();
    this.mailUsuarioActual = user.email;
    if(this.mailUsuarioActual == "admin@admin.com"){
      this.esAdmin = true;
    }
    else{
      this.esAdmin = false;
    }
    await this.VerificarSaldoActualUsuario();
    this.listaCodigosEscaneadosPorUsuario = this.ObtenerTodosLosEscaneadosDelUsuario(this.mailUsuarioActual);
  }

  async VerificarSaldoActualUsuario(){
    this.firestore.ObtenerUnDato("saldo-usuarios-qr", this.mailUsuarioActual).toPromise().then(async(dato)=>{
      if(dato.exists){
        this.saldoActualUsuario= dato.data().saldoActual;
      }
      else{
        this.saldoActualUsuario = 0;        
        await this.firestore.AgregarDatoConId("saldo-usuarios-qr",this.mailUsuarioActual, {saldoActual:0});
      }
    })
  }

  Escanear(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.VerificarEscaneo(barcodeData.text);
     }).catch(err => {
         alert('Error: '+ err);
     });
  }

  async VerificarEscaneo(textoScaneado: string){
    await this.ObtenerSaldoEscan(textoScaneado);
    if(this.esAdmin){
      if(this.CantidadEscaneos(textoScaneado)==2){
        this.alertError("No puede usar mas de dos veces el mismo código");
      }
      else{
        //  AGREGAR ESCANER Y SALDO
        await this.AgregarEscaneo(this.saldoDeCodigo, textoScaneado);
      }
    }
    else{
      if(this.CantidadEscaneos(textoScaneado)==1){
        this.alertError("Éste código ya fue utilizado");
      }
      else{
        //  AGREGAR ESCANER Y SALDO
        await this.AgregarEscaneo(this.saldoDeCodigo, textoScaneado);
      }
    }
  }

  async ObtenerSaldoEscan(codigoScan: string){
    await this.firestore.ObtenerUnDato("codigos-qr", codigoScan).toPromise().then((data)=>{
      this.saldoDeCodigo = data.data().saldo;
    });

  }
  
  async AgregarEscaneo(saldo: number, codigo: string){
    let dato = {
      email: this.mailUsuarioActual,
      saldo: saldo,
      codigo: codigo
    };
    try{
      await this.firestore.AgregarDatoSinId("codigos-escaneados", dato);
      this.presentLoading('Realizando carga...');
      this.toastRegistroExitoso("Se han cargado "+saldo+" pesos exitosamente");
      let actualizacion = {
        saldoActual: this.saldoActualUsuario + saldo
      };
      this.firestore.ActualizarDatos("saldo-usuarios-qr", this.mailUsuarioActual, actualizacion);
      this.saldoActualUsuario = this.saldoActualUsuario + saldo;
      await this.CargarDatos();
    }
    catch(err){
      // ALGO PASO
      this.alertError("PASO ALGO: "+err);
    }
  }

  CantidadEscaneos(textoScan: string){
    let cantidad = 0;
    this.listaCodigosEscaneadosPorUsuario.forEach(element => {
      if(element.codigo == textoScan){
        cantidad+=1;
      }
    });
    return cantidad;
  }

  ObtenerTodosLosEscaneadosDelUsuario(emailDeUsuario: string){
    let listaRetornar = new Array<any>();
    this.firestore.ObtenerTodosDatos("codigos-escaneados").subscribe((querySnapshot)=>{
      querySnapshot.forEach((dato) => {
        if(dato.data().email ==emailDeUsuario){
          listaRetornar.push(dato.data());
        }
      });
    });
    return listaRetornar;
  }

  async alertError(mensaje: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alertErroresLoguear',
      header: 'Error',
      message: mensaje,
      buttons: ['Entendido'],
    });
    await alert.present();
  }

  async toastRegistroExitoso(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: "light",
      position: "bottom"
    });
    toast.present();
  }

  async LimpiarCargas(){
    await this.firestore.ObtenerTodosDatos("codigos-escaneados").toPromise().then((datos)=>{
      datos.forEach(element => {
        this.firestore.BorrarDato("codigos-escaneados", element.id);
      });      
    });
    let actualizacion = {
      saldoActual: 0
    };
    this.firestore.ActualizarDatos("saldo-usuarios-qr", this.mailUsuarioActual, actualizacion);
    this.saldoActualUsuario = 0;
    this.CargarDatos();
  }

  async Salir(){
    await this.auth.DesloguearUsuario();    
    this.router.navigate(['login']);
  }

  async presentLoading(mensaje) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      duration: 4000,
      spinner: "dots"
    });
    await loading.present();
  }
}
