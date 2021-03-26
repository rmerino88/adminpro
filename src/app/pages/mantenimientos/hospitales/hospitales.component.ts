import { Component, OnInit, OnDestroy } from '@angular/core';

import { HospitalesService } from '../../../services/hospitales.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Hospital } from '../../../models/hospital.model';
import { Tipo } from '../../../models/tipos.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public cargando = false;
  public hospitales: Hospital[] = [];

  private imgSubs: Subscription;

  constructor(private hospitalesService: HospitalesService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.imgCambiada.subscribe(() => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalesService.obtenerHospitales().subscribe( (hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  buscarHospital(termino: string) {
    console.log('Entra termino:', termino);
    this.cargando = true;
    if (termino) {
      this.busquedasService.buscarColeccion(termino, Tipo.hospitales)
        .subscribe(({ total, resultado }) => {
          this.hospitales = resultado;
          this.cargando = false;
        });
    } else {
      this.cargarHospitales();
    }
  }

  modificarHospital(_id: string, nombre: string) {
    this.hospitalesService.editHospital(_id, nombre).subscribe(
      hospital => {
        if (hospital) {
          Swal.fire(
            'Hecho!',
            `El hospital ${hospital.nombre} has sido modificado con éxito.`,
            'success'
          );
        }
      }
    );
  }

  abrirModalImagen(hospital: Hospital) {
    this.modalImagenService.abrirModal(Tipo.hospitales, hospital._id, hospital.img);
  }

  async crearHospital() {
    // está desestructurado por que tiene más información, a parte del value
    const { value: nombre = '' } = await Swal.fire({
      title: 'Nuevo hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value && value.length < 4) {
          return 'Es necesario introducir algún valor!';
        }
      }
    });

    if (nombre) {
      this.hospitalesService.addHospital(nombre).subscribe(
        hospital => {
          if (hospital) {
            Swal.fire(
              'Hecho!',
              `El hospital ${hospital.nombre} has sido dado de alta en el sistema`,
              'success'
            );
            this.cargarHospitales();
          }
        }
      );
    }
  }

  eliminarHospital(_id: string, nombre: string) {
    this.hospitalesService.deleteHospital(_id).subscribe(() => {
      Swal.fire(
        'Hecho!',
        `El hospital ${nombre} has sido dado de alta en el sistema`,
        'success'
      );
      this.cargarHospitales();
    });
  }
}
