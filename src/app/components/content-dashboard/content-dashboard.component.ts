import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Vehiculo, NocirculaService} from '../../services/nocircula/nocircula.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.css']
})
export class ContentDashboardComponent implements OnInit {

  formaVehiculos: FormGroup;
  formaConsulta: FormGroup;
  // @ts-ignore
  vehiculo: Vehiculo = [];
  successMessage: string;
  errorMessage: string;
  advertenceMessage: string;
  fechaHoy: Date;


  openCustomWidthVariant(content) {
    this.modalService.open(content, { windowClass: 'custom-width-variant-modal' });
  }

  openFormaVehiculo(content) {
    this.crearFormularioVehiculo();
    this.openCustomWidthVariant(content);
  }

  openFormaConsulta(content) {
    this.crearFormularioConsulta();
    this.openCustomWidthVariant(content);
  }

  cerrarModales() {
    this.modalService.dismissAll();
  }

  irRegistroVehiculo(content) {
    this.cerrarModales();
    this.openFormaVehiculo(content);
  }

  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private vehiculoServie: NocirculaService) { }

  ngOnInit() {
    this.fechaHoy = new Date();
    console.log(this.fechaHoy.toLocaleString().substr(0, 6));

  }

  crearFormularioVehiculo() {
    this.formaVehiculos = this.fb.group({
      Placa: ['', [Validators.required, Validators.maxLength(7), Validators.minLength(7)]],
      Color: ['', Validators.required],
      Modelo: ['', Validators.required],
      Chasis: ['', Validators.required],
      Anio: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]]
    });
  }

  crearFormularioConsulta() {
    this.formaConsulta = this.fb.group( {
      Placa: ['', [Validators.required, Validators.maxLength(7), Validators.minLength(7)]],
      Fecha: ['', Validators.required]
    });
  }

  consultarReestriccion(contentE, contentA) {
    const fechaConsulta = new Date(this.formaConsulta.value.Fecha);
    if (fechaConsulta.toLocaleString().substr(0, 6) >= this.fechaHoy.toLocaleString().substr(0, 6)) {
      this.vehiculoServie.getReestriccion(this.formaConsulta.value.Placa, this.formaConsulta.value.Fecha.toString()).subscribe(
        (data: any) => {
          if (data === null) {
            this.advertenceMessage = 'Vehículo puede circular en la fecha seleccionada!.';
            this.modalService.open(contentA, { windowClass: 'custom-width-error-modal' });
          } else {
            this.errorMessage = 'Vehículo no puede circular en la fecha seleccionada!.';
            this.modalService.open(contentE, { windowClass: 'custom-width-error-modal' });
          }
        }, (errorServicio) => {
          console.log(errorServicio);
        }
      );
    } else {
      alert('La fecha debe ser mayor o igual a la actual');
    }
  }

  buscarVehiculo(content) {
    if (this.formaConsulta.value.Placa.length === 7) {
      this.vehiculoServie.getVehiculo(this.formaConsulta.value.Placa).subscribe(
        (data: any) => {
          if (data === null) {
            this.advertenceMessage = 'Vehículo no registrado!¿Desea Registrar el Vehículo?';
            this.modalService.open(content, { windowClass: 'custom-width-error-modal' });
          }
        }, (errorServicio) => {
          console.log(errorServicio);
        }
      );
    }
  }

  guardarVehiculo(content) {

    this.vehiculo.placa = this.formaVehiculos.value.Placa;
    this.vehiculo.color = this.formaVehiculos.value.Color;
    this.vehiculo.modelo = this.formaVehiculos.value.Modelo;
    this.vehiculo.chasis = this.formaVehiculos.value.Chasis;
    this.vehiculo.anio = this.formaVehiculos.value.Anio;

    this.vehiculoServie.postVehiculo(this.vehiculo).subscribe(
      (data: any) => {
        if (data === 'OK') {
          this.successMessage = 'Vehículo ingresado';
          this.modalService.dismissAll();
        } else {
          this.errorMessage = data;
          this.modalService.open(content, { windowClass: 'custom-width-error-modal' });
        }
      }, (errorServicio) => {
        this.errorMessage = errorServicio;
        this.modalService.open(content, { windowClass: 'custom-width-error-modal' });
      }
    );
  }
}
