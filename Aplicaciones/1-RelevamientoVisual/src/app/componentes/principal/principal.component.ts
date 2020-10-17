import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

  constructor(private router: Router, private auth: AutenticacionService) { }

  ngOnInit() {}

  VerCosasLindas(){
    this.router.navigate(['cosas-lindas']);
  }

  VerCosasFeas(){
    this.router.navigate(['cosas-feas'])
  }

  CerrarSesion(){
    this.auth.Desloguear();
    this.router.navigate(['login']);
  }
}
