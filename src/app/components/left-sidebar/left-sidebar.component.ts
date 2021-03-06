import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  masters: any;
  tipoUsuario = '';
  constructor(private auth: AuthService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    const infomaster = localStorage.info;
    this.masters = JSON.parse(infomaster);
    this.tipoUsuario = this.masters.rol.nombres;
  }

}
