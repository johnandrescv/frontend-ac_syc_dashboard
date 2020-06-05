import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: UsuarioModelo[] = [];
  admins: UsuarioModelo[] = [];
  accesos: UsuarioModelo[] = [];
  loading = false;
  moreData = true;
  log = {
    administrador: 0,
    acceso: 0,
    fecha_inicio: '',
    fecha_fin:'',
    pagina:0,
    valid : true,
  };
  menu = ['Registro de Apertura'];
  constructor(private auth: AuthService,
              private router: Router,
              private modalService: NgbModal, ) { }

  ngOnInit() {
    this.auth.getAdmin()
      .subscribe( (resp: any) => {
        this.admins.push(...resp);
      });
    this.auth.getAcceso()
      .subscribe( (resp: any) => {
        this.accesos.push(...resp);
      });
  }

  openLog(content, log) {
    this.modalService.open(content, { size: 'lg'});
  }

  async gestionLog() {
    const params = this.setParams();
    let response: any;
    response = await this.auth.getLogs(params);
    this.logs = [ response[1]];
    console.log(this.logs);
    this.modalService.dismissAll();

  }

  setParams() {
    const fechainicio = moment(this.log.fecha_inicio).format('YYYY-MM-DD');
    const fechafin = moment(this.log.fecha_fin).format('YYYY-MM-DD');
    let params = `fecha_inicio=${fechainicio}&fecha_fin=${fechafin}&pagina=${this.log.pagina}`;
    if (this.log.administrador !== 0) {
      params += `&administrador=${this.log.administrador.toString()}`;
    }

    if (this.log.acceso !== 0) {
      params += `&acceso=${this.log.acceso.toString()}`;
    }
    return params;
  }

  async nextPageLogs() {
    this.log.pagina++;
    this.loading = true;
    const params = this.setParams();
    const response = await this.auth.getLogs(params);
    if (response[0]) {
      if (response[1].length > 0) {
        this.logs.push(...response[1]);
      } else {
        this.moreData = false;
      }
    }
    this.loading = false;
  }

  // checkDates() {
  //   if (new Date(this.log.fecha_inicio).getTime() > this.log.fecha_fin.getTime()) {
  //       this.auth.showAlert('La Fecha de Inicio debe ser menor a la Fecha de Fin', 'warning', 'Ok');
  //       this.log.valid = false;
  //       return;
  //   }
  //   this.log.valid = true;
  // }

}
