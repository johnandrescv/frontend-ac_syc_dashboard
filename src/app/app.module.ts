import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPipesModule } from 'ng-pipes';
import { MomentModule } from 'ngx-moment';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { Page2Component } from './pages/page2/page2.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AccesoComponent } from './pages/acceso/acceso.component';
import { LogsComponent } from './pages/logs/logs.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { HistorialComponent } from './pages/historial/historial.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiffPipe } from './pipes/diff.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopbarComponent,
    LeftSidebarComponent,
    HomeComponent,
    FooterComponent,
    BreadcrumbComponent,
    AdministradorComponent,
    Page2Component,
    UsuarioComponent,
    AccesoComponent,
    LogsComponent,
    FilterPipe,
    HistorialComponent,
    DashboardComponent,
    DiffPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgPipesModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    MomentModule,
    NgxChartsModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
