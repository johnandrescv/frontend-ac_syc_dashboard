import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModelo } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModelo = new UsuarioModelo();
  constructor( private auth: AuthService,
               private router: Router, ) { }


  ngOnInit() {
  }
  login( form: NgForm ) {
    if ( form.invalid ) { return; }
    const body = new FormData();
    body.append('usuario', this.usuario.usuario);
    body.append('clave', this.usuario.clave);
    Swal.fire({
      icon: 'info',
      allowOutsideClick: false,
      text: 'Espere por favor'

    });
    Swal.showLoading();
    
    this.auth.login( body )
    .subscribe( resp => {
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.message
      });
    });

  }
}
