import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  admins: UsuarioModelo[] = [];
  roles: UsuarioModelo[] = [];
  accesos: UsuarioModelo[] = [];
  adminaccess: UsuarioModelo[] = [];
  filterName = '';
  admin = {
    id_administrador: 0,
    correo: '',
    nombres: '',
    edit: false,
    clave: '',
    usuario: '',
    rol: '',
  };
  acceso = {
    accesos: '',
    id_administrador: '',
  };

  menu = ['Administradores'];
  constructor(private auth: AuthService,
              private router: Router,
              private modalService: NgbModal, ) { }


    ngOnInit() {
      this.getAdmin();
      this.auth.getRol()
      .subscribe( (resp: any) => {
        this.roles.push(...resp);
      });
      this.auth.getAcceso()
      .subscribe( (resp: any) => {
        this.accesos.push(...resp);
      });
    }
    openAcceso(content, acceso) {
      this.acceso.id_administrador = acceso.id_administrador;
      this.adminaccess = acceso.accesos;
      this.modalService.open(content);
    }

    openAdmin(content, admin = null) {
      if (admin) {
        this.admin.id_administrador = admin.id_administrador;
        this.admin.correo = admin.correo;
        this.admin.clave = admin.clave;
        this.admin.nombres = admin.nombres;
        this.admin.edit = true;
        this.admin.usuario = admin.usuario;
        this.admin.rol = admin.rol.id_rol;
      } else {
        this.admin.id_administrador = 0;
        this.admin.correo = '';
        this.admin.nombres = '';
        this.admin.clave = '';
        this.admin.edit = false;
        this.admin.rol = '';
        this.admin.usuario = '';
      }
      this.modalService.open(content);
    }
    getAdmin() {
      this.auth.getAdmin()
      .subscribe( (resp: any) => {
        this.admins = resp;
      });
    }
    async AsignarAcceso() {
      let response: any;
      const body = new FormData();
      body.append('accesos', this.acceso.accesos);
      response = await this.auth.AsignarAcceso(body, this.acceso.id_administrador);
    }

    async gestionAdmin() {
      let response: any;
      if (this.admin.edit) {
        const body = `nombres=${this.admin.nombres}&correo=${this.admin.correo}&rol=${this.admin.rol}&usuario=${this.admin.usuario}`;
        response = await this.auth.editAdmin(this.admin.id_administrador, body);
      } else {
        const body = new FormData();
        body.append('correo', this.admin.correo);
        body.append('nombres', this.admin.nombres);
        body.append('clave', this.admin.clave);
        body.append('rol', this.admin.rol);
        body.append('usuario', this.admin.usuario);
        response = await this.auth.createAdmin(body);
      }
      if (response) {
        this.modalService.dismissAll();
        this.getAdmin();
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
          this.deleteAdmin(id);
        }
      });
    }



    async deleteAdmin(id: number) {
      const response = await this.auth.deleteAdmin(id);
      if (response) {
        this.getAdmin();
      }
    }
}
