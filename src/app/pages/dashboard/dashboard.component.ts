import { environment } from './../../../environments/environment.prod';
import { Component, NgZone, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy {

  menu = ['Dashboard'];
  chart: am4charts.XYChart;
  dashboard = {
    unicos_entradas: 0,
    entradas: 0,
    salidas: 0,
    socios: 0,
    invitados: 0,
    proveedores: 0,
  };
  typeDataSource: any;
  typeChart: any;
  viewType = 0;
  constructor(private zone: NgZone) {
    moment.locale('es');
  }

  ngOnInit() {
    if (localStorage.syc_dashboard) {
      this.dashboard = JSON.parse(localStorage.syc_dashboard);
    }
  }
​
  ngAfterViewInit() {
      this.drawBarChart();
      this.drawLineChart();
      this.drawLineDaylyChart();
  }
​
  changeView(type) {
    this.viewType = type;
    this.typeDataSource.url = `${environment.apiUrl}/dashboard?mensual=${this.viewType}`;
    this.typeDataSource.load();
    this.typeDataSource.events.on('done', (ev) => {
      this.typeChart.data = ev.target.data.tipo;
      this.dashboard = ev.target.data;
    });
    this.typeChart.validateData();
  }
​
  drawBarChart() {
    this.zone.runOutsideAngular(() => {
      this.typeChart = am4core.create('bar-chart', am4charts.XYChart);
​
      this.typeChart.paddingRight = 20;
​
      this.typeDataSource = new am4core.DataSource();
      this.typeDataSource.requestOptions.requestHeaders = [{
        key: 'token',
        value: '56872599af24ad3d4735e1a02f05b91c'
      }];
      this.typeDataSource.url = `${environment.apiUrl}/dashboard?mensual=${this.viewType}`;
      this.typeDataSource.load();
      this.typeDataSource.events.on('done', (ev) => {
        this.typeChart.data = ev.target.data.tipo;
        this.dashboard = ev.target.data;
      });
​
      const categoryAxis = this.typeChart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'tipo';
      categoryAxis.title.text = 'Tipos de Usuario';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
​
      const valueAxis = this.typeChart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = 'Total de Accesos';
​
      const series = this.typeChart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = 'total';
      series.dataFields.categoryX = 'tipo';
      series.name = 'Total de Accesos';
      series.tooltipText = '{name}: [bold]{valueY}[/]';
      series.stacked = true;
      series.heatRules.push({
        target: series.columns.template,
        property: 'fill',
        min: am4core.color('#4964E8'),
        max: am4core.color('#151C42'),
        dataField: 'valueY'
      });
​
      // Add cursor
      this.typeChart.cursor = new am4charts.XYCursor();
    });
  }
​
  drawLineChart() {
    this.zone.runOutsideAngular(() => {
      const DateChart = am4core.create('line-month-chart', am4charts.XYChart);
      const title = DateChart.titles.create();
      DateChart.paddingRight = 20;
​
      const DataSource = new am4core.DataSource();
      DataSource.requestOptions.requestHeaders = [{
        key: 'token',
        value: '56872599af24ad3d4735e1a02f05b91c'
      }];
      DataSource.url = `${environment.apiUrl}/dashboard?mensual=1`;
      DataSource.load();
      DataSource.events.on('done', (ev) => {
        const localarray = [];
        ev.target.data.visitas.forEach(element => {
          const data = {fecha: moment(element.fecha, 'DD-MM-YYYY').toDate(), total: element.total};
          localarray.push(data);
        });
        DateChart.data = localarray;
      });
​
      const categoryAxis = DateChart.xAxes.push(new am4charts.DateAxis());
      categoryAxis.title.text = 'Días';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.tooltipDateFormat = 'YYYY MMM, dd';
​
      const valueAxis = DateChart.yAxes.push(new am4charts.ValueAxis());
​
      const series = DateChart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = 'total';
      series.dataFields.dateX = 'fecha';
      series.strokeWidth = 3;
      series.tensionX = 0.8;
      series.name = 'Total de Accesos';
      series.tooltipText = '{name}: [bold]{valueY}[/]';
      series.stacked = true;
      series.fill = am4core.color('#151C42');
      series.stroke = am4core.color('#151C42');
      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.radius = 6;
      bullet.circle.fill = am4core.color('#151C42');
      bullet.circle.strokeWidth = 3;
​
      DateChart.cursor = new am4charts.XYCursor();
    });
  }
​
  drawLineDaylyChart() {
    this.zone.runOutsideAngular(() => {
      const DateChart = am4core.create('line-day-chart', am4charts.XYChart);
​
      DateChart.paddingRight = 20;
​
      const DataSource = new am4core.DataSource();
      DataSource.requestOptions.requestHeaders = [{
        key: 'token',
        value: '56872599af24ad3d4735e1a02f05b91c'
      }];
      DataSource.url = `${environment.apiUrl}/dashboard`;
      DataSource.load();
      DataSource.events.on('done', (ev) => {
        const localarray = [];
        ev.target.data.visitas.forEach(element => {
          const data = {fecha: moment(element.fecha, 'DD-MM-YYYY H').toDate(), total: element.total};
          localarray.push(data);
        });
        DateChart.data = localarray;
      });
​
      const categoryAxis = DateChart.xAxes.push(new am4charts.DateAxis());
      categoryAxis.title.text = 'Horas';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.baseInterval = {
        timeUnit: 'hour',
        count: 1
      };
      categoryAxis.tooltipDateFormat = 'MMM, dd HH:00';
​
      const valueAxis = DateChart.yAxes.push(new am4charts.ValueAxis());
​
      const series = DateChart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = 'total';
      series.dataFields.dateX = 'fecha';
      series.strokeWidth = 3;
      series.tensionX = 0.8;
      series.name = 'Total de Accesos';
      series.tooltipText = '{name}: [bold]{valueY}[/]';
      series.stacked = true;
      series.fill = am4core.color('#4964E8');
      series.stroke = am4core.color('#4964E8');
      series.bullets.push(new am4charts.CircleBullet());
​
      DateChart.cursor = new am4charts.XYCursor();
    });
  }
​
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
    localStorage.setItem('syc_dashboard', JSON.stringify(this.dashboard));
  }
}
