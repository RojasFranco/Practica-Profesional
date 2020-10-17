import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

  constructor(private router: Router,public loadingController: LoadingController) { 
    this.presentLoading("Cargando...")
  }

  ngOnInit() {}

  IrAlCurso(curso: string){
       this.router.navigate([curso]);
  }

  async presentLoading(mensaje) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      duration: 3000,
      spinner: "lines"
    });
    await loading.present();
  }
}
