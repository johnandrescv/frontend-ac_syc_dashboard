import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {
  accesos: UsuarioModelo[] = [];
  acceso = {
    id_acceso: 0,
    ip: '',
    nombres: '',
    is_salida: '',
    edit: false,
    url: '',
    camara: ''
  };

  menu = ['Accesos'];

  constructor(public auth: AuthService,
              private router: Router,
              private modalService: NgbModal, ) { }

  ngOnInit() {
    this.getAcceso();
  }

  openAcceso(content, acceso = null) {
    if (acceso) {
      this.acceso.id_acceso = acceso.id_acceso;
      this.acceso.ip = acceso.ip;
      this.acceso.url = acceso.url;
      this.acceso.is_salida = acceso.is_salida;
      this.acceso.nombres = acceso.nombres;
      this.acceso.camara = acceso.camara;
      this.acceso.edit = true;
    } else {
      this.acceso.id_acceso = 0;
      this.acceso.ip = '';
      this.acceso.url = '';
      this.acceso.is_salida = '';
      this.acceso.nombres = '';
      this.acceso.camara = '';
      this.acceso.edit = false;
    }
    this.modalService.open(content);
  }

  getAcceso() {
    this.auth.getAcceso()
    .subscribe( (resp: any) => {
      this.accesos = resp;
    });
  }


  async gestionAcceso() {
    let response: any;
    if (this.acceso.edit) {
      const body = `nombres=${this.acceso.nombres}&camara=${this.acceso.camara}&ip=${this.acceso.ip}&is_salida=${this.acceso.is_salida}&url=${this.acceso.url}`;
      response = await this.auth.editAcceso(this.acceso.id_acceso, body);
    } else {
      const body = new FormData();
      body.append('ip', this.acceso.ip);
      body.append('url', this.acceso.url);
      body.append('camara', this.acceso.camara);
      body.append('is_salida', this.acceso.is_salida);
      body.append('nombres', this.acceso.nombres);
      response = await this.auth.createAcceso(body);
    }

    if (response) {
      this.modalService.dismissAll();
      this.getAcceso();
    }
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Seguro que desea eliminar este registro?',
      text: 'Esta acción no se puede reversar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#343A40',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.deleteAcceso(id);
      }
    });
  }

  async deleteAcceso(id: number) {
    const response = await this.auth.deleteAcceso(id);
    if (response) {
      this.getAcceso();
    }
  }

}
