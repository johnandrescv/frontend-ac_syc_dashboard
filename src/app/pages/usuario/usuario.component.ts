import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  users = [];
  backup = [];
  tipos = [];
  filterName = '';
  loading = false;
  moreData = true;
  page = 0;
  user = {
    id_usuario: 0,
    imagen: null,
    dni: '',
    nombres: '',
    edit: false,
    id_tipo: '',
  };

  menu = ['Usuarios'];

  constructor(public auth: AuthService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
      this.getUser();
      this.auth.getTypeUser()
      .subscribe( (resp: any) => {
        this.tipos.push(...resp);
      });
  }


  openUser(content, user = null) {
    if (user) {
      this.user.id_usuario = user.id_usuario;
      this.user.imagen = (user.imagen === '') ? null : user.imagen;
      this.user.dni = user.dni;
      this.user.id_tipo = user.tipo.id_tipo;
      this.user.nombres = user.nombres;
      this.user.edit = true;
    } else {
      this.user.id_usuario = 0;
      this.user.imagen = null;
      this.user.dni = '';
      this.user.nombres = '';
      this.user.id_tipo = '';
      this.user.edit = false;
    }
    this.modalService.open(content);
  }

  getUser() {
    this.loading = true;
    this.auth.getUser(this.page).subscribe( (resp: any) => {
      if (resp.length === 0) {
        this.moreData = false;
      }
      this.users = [...this.users, ...resp];
      this.backup = this.users;
      this.loading = false;
    });
  }

  nextPageUser() {
    this.page = this.page+1;
    this.getUser();
  }


  async gestionUser() {
    let response: any;
    if (this.user.edit) {
      const body = `nombres=${this.user.nombres}&dni=${this.user.dni}&id_tipo=${this.user.id_tipo}`;
      response = await this.auth.editUser(this.user.id_usuario, body);
    } else {
      const body = new FormData();
      body.append('dni', this.user.dni);
      body.append('nombres', this.user.nombres);
      body.append('id_tipo', this.user.id_tipo);
      response = await this.auth.createUser(body);
    }

    if (response) {
      this.modalService.dismissAll();
      this.getUser();
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
        this.deleteUser(id);
      }
    });
  }

  async deleteUser(id: number) {
    const response = await this.auth.deleteUser(id);
    if (response) {
      this.getUser();
    }
  }

  async textSearch() {
    this.users = [];
    if (this.filterName.length === 0 ) {
      this.users = this.backup;
      return;
    }

    this.loading = true
    const body = new FormData();
    body.append('texto', this.filterName);
    this.auth.searchUser(body).subscribe( (resp: any) => {
      this.users = resp;
      this.loading = false;
    });
  }
}
