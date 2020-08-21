import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Option } from 'src/app/models/interface';
import * as moment from 'moment';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historiales = [];
  admins = [];
  users = [];
  loading = false;
  moreData = true;
  historial = {
    administrador: 0,
    tipo_usuario: 0,
    fecha_inicio: '',
    fecha_fin: '',
    pagina: 0,
  };
  fechainicio = '';
  fechafin = '';
  menu = ['Historial'];
  constructor(private auth: AuthService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.auth.getAdmin()
    .subscribe( (resp: any) => {
      this.admins.push(...resp);
    });
    this.auth.getTypeUser()
    .subscribe( (resp: any) => {
      this.users.push(...resp);
    });
    this.gestionHistorial();
  }

  openHistorial(content) {
    this.modalService.open(content, { size: 'lg'});
  }

  async gestionHistorial() {
    const params = this.setParams();
    let response: any;
    response = await this.auth.getHistorial(params);
    this.historiales = response[1];
    this.modalService.dismissAll();
  }

  setParams() {
    this.fechainicio = moment(this.historial.fecha_inicio).format('YYYY-MM-DD');
    this.fechafin = moment(this.historial.fecha_fin).format('YYYY-MM-DD');

    if (this.historial.fecha_inicio === '') {
      this.fechainicio = moment().format('YYYY-MM-DD');
    }
    if (this.historial.fecha_fin === '') {
      this.fechafin = moment().format('YYYY-MM-DD');
    }
    
    let params = `fecha_inicio=${this.fechainicio}&fecha_fin=${this.fechafin}&pagina=${this.historial.pagina}`;
  
    if (this.historial.administrador !== 0) {
      params += `&administrador=${this.historial.administrador.toString()}`;
    }
    if (this.historial.tipo_usuario !== 0) {
      params += `&tipo_usuario=${this.historial.tipo_usuario.toString()}`;
    }
    return params;
  }

  async nextPageHistorial() {
    this.historial.pagina++;
    this.loading = true;
    const params = this.setParams();
    const response = await this.auth.getHistorial(params);
    if (response[0]) {
      if (response[1].length > 0) {
        this.historiales.push(...response[1]);
      } else {
        this.moreData = false;
      }
    }
    this.loading = false;
  }
}
