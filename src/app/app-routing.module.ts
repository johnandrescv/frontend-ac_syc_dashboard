import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { Page2Component } from './pages/page2/page2.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AccesoComponent } from './pages/acceso/acceso.component';
import { LogsComponent } from './pages/logs/logs.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RolGuard } from './guards/rol.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
    {path: 'administrador', component: AdministradorComponent, canActivate: [RolGuard]},
    {path: 'page2', component: Page2Component},
    {path: 'usuario', component: UsuarioComponent, canActivate: [RolGuard]},
    {path: 'acceso', component: AccesoComponent, canActivate: [RolGuard]},
    {path: 'logs', component: LogsComponent},
    {path: 'historial', component: HistorialComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '**', redirectTo: 'dashboard'},
  ]},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
