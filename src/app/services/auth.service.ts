import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from './../../environments/environment';
import { UsuarioModelo } from '../models/usuario.model';
import * as moment from 'moment';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loading = false;
  master: UsuarioModelo;
  private apikey = '';
  userToken: string;
  info: any;
  infoGuard: any;
  constructor(private http: HttpClient) {
    this.leerToken();
    moment.locale('es');
  }

logout() {
 localStorage.removeItem('token');
 localStorage.removeItem('info');
}

login(body: FormData) {
 return this.http.post(
   `${ environment.apiUrl }/login`,
   body
 ).pipe(
   map( (resp: any) => {
     if (resp.administrador.rol.nombres === 'Master' || resp.administrador.rol.nombres === 'Administrador') {
     this.guardarToken( resp.administrador);
     return resp;
     }
   })
 );
}

private guardarToken( idToken: any) {
 this.userToken = idToken.api_key;
 this.info = JSON.stringify(idToken);
 this.infoGuard = idToken.rol.id_rol;
 localStorage.setItem('token', idToken.api_key);
 localStorage.setItem('info', JSON.stringify(idToken));
}

leerToken() {
 if ( localStorage.getItem('token') ) {
   this.userToken = localStorage.getItem('token');
   this.info = JSON.parse(localStorage.getItem('info'));
   this.infoGuard = this.info.rol.id_rol;
 } else {
   this.userToken = '';
 }
 return this.userToken;

}


// ADMINISTRADOR
getAdmin() {
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return this.http.get(`${environment.apiUrl}/admin`, {headers})
  .pipe(
    map( (resp: any) => {
      return resp.administradores;
    })
  );
}


createAdmin(data: FormData) {
  this.loading = true;
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.post(`${environment.apiUrl}/admin`, data, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}

editAdmin(id: number, data: any) {
  this.loading = true;
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.put(`${environment.apiUrl}/admin/${id}`, data, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}

deleteAdmin(id: number) {
  this.loading = true;
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.delete(`${environment.apiUrl}/admin/${id}`, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}
// ROL
getRol() {
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return this.http.get(`${environment.apiUrl}/roles`, {headers})
  .pipe(
    map( (resp: any) => {
      return resp.roles;
    })
  );
}
// TIPO DE USUARIO
getTypeUser() {
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return this.http.get(`${environment.apiUrl}/tipos`, {headers})
  .pipe(
    map( (resp: any) => {
      return resp.tipos;
    })
  );
}

// USUARIO
getUser(page: number) {
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return this.http.get(`${environment.apiUrl}/usuarios?pagina=${page}`, {headers})
  .pipe(
    map( (resp: any) => {
      return resp.usuarios;
    })
  );
}

searchUser(body: FormData) {
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return this.http.post(`${environment.apiUrl}/usuarios/search`, body, {headers})
  .pipe(
    map( (resp: any) => {
      return resp.usuarios;
    })
  );
}

createUser(data: FormData) {
  this.loading = true;
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.post(`${environment.apiUrl}/usuarios`, data, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}

editUser(id: number, data: any) {
  this.loading = true;
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.put(`${environment.apiUrl}/usuarios/${id}`, data, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}

deleteUser(id: number) {
  this.loading = true;
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.delete(`${environment.apiUrl}/usuarios/${id}`, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}

// ACCESO
getAcceso() {
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return this.http.get(`${environment.apiUrl}/acceso`, {headers})
  .pipe(
    map( (resp: any) => {
      return resp.accesos;
    })
  );
}


createAcceso(data: FormData) {
  this.loading = true;
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.post(`${environment.apiUrl}/acceso`, data, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}

editAcceso(id: number, data: any) {
  this.loading = true;
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.put(`${environment.apiUrl}/acceso/${id}`, data, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}

deleteAcceso(id: number) {
  this.loading = true;
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.delete(`${environment.apiUrl}/acceso/${id}`, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}

AsignarAcceso(data: FormData, id: any) {
  this.loading = true;
  const headers = new HttpHeaders({
    token: this.userToken
  });
  return new Promise(resolve => {
    this.http.post(`${environment.apiUrl}/admin/${id}/accesos`, data, {headers}).subscribe((response: any) => {
      this.showAlert(response.message, 'success', 'Listo');
      resolve(true);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.showAlert(error.error.message, 'error');
      resolve(false);
    });
  });
}

  // LOGS
  getLogs(params: string) {
    const headers = new HttpHeaders({
      token: this.userToken
    });
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/logs?${params}`, { headers } ).subscribe((response: any) => {
        this.loading = false;
        resolve([true, response.registros]);
      }, (error: any) => {
        this.loading = false;
        this.showAlert(error.error.message, 'error');
        resolve([false]);
      });
    });
  }

  // HISTORIAL
  getHistorial(params: string) {
    const headers = new HttpHeaders({
      token: this.userToken
    });
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/historial?${params}`, { headers } ).subscribe((response: any) => {
        this.loading = false;
        resolve([true, response.registros]);
      }, (error: any) => {
        this.loading = false;
        this.showAlert(error.error.message, 'error');
        resolve([false]);
      });
    });
  }

  showAlert(message: string, tipo: any, confirmBtnText: string = 'Intentar nuevamente') {
      Swal.fire({
        title: 'Datos Correctos',
        text: message,
        icon: tipo,
        confirmButtonText: confirmBtnText
      });
  }
}
