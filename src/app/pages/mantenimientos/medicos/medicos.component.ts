import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { MedicosService } from '../../../services/medicos.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { HospitalesService } from '../../../services/hospitales.service';

import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import { Tipo } from '../../../models/tipos.model';
import { ModalMedicoService } from '../../../services/modal-medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando = false;
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  private imgSubs: Subscription;
  private medicoSubs: Subscription;

  constructor(private medicosService: MedicosService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService,
              private modalMedicoService: ModalMedicoService,
              private hospitalesService: HospitalesService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.imgCambiada.subscribe(() => this.cargarMedicos());
    this.medicoSubs = this.modalMedicoService.medicoAniadido.subscribe(() => this.cargarMedicos());
    this.hospitalesService.obtenerHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
    this.medicoSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.obtenerMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  buscarMedico(termino: string) {
    this.cargando = true;
    if (termino) {
      this.busquedasService.buscarColeccion(termino, Tipo.medicos)
        .subscribe(({ total, resultado }) => {
          this.medicos = resultado;
          this.cargando = false;
        });
    } else {
      this.cargarMedicos();
    }
  }

  modificarMedico(mid: string, nombre: string, hospitalId: string) {
    // Si no selecciona un hospital casca en el servicio de backend
    this.medicosService.editMedico(mid, nombre, hospitalId ).subscribe(
      medico => {
        if (medico) {
          Swal.fire(
            'Hecho!',
            `El medico ${medico.nombre} has sido modificado con éxito.`,
            'success'
          );
        }
      }
    );
  }

  /**
   * No funciona ya que debemos colocar el hospital al que pertenece el médico
   * Se puede hacer con un modal o en una nueva pantalla
   */
  async crearMedico() {
    // Está desestructurado por que tiene más información, a parte del value
    const { value: nombre = '' } = await Swal.fire({
      title: 'Nuevo medico',
      input: 'text',
      inputLabel: 'Nombre del medico',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value && value.length < 4) {
          return 'Es necesario introducir algún valor!';
        }
      }
    });

    if (nombre) {
      this.medicosService.addMedico(nombre, '60378c245625ab01c496d494').subscribe(
        medico => {
          if (medico) {
            Swal.fire(
              'Hecho!',
              `El medico ${medico.nombre} has sido dado de alta en el sistema`,
              'success'
            );
            this.cargarMedicos();
          }
        }
      );
    }
  }

  eliminarMedico(mid: string, nombre: string) {
    this.medicosService.deleteMedico(mid).subscribe(() => {
      Swal.fire(
        'Hecho!',
        `El medico ${nombre} has sido dado de abaja en el sistema`,
        'success'
      );
      this.cargarMedicos();
    });
  }

  cambiarHospital(medico: Medico) {
    // Llega en el _id del hospital el hospital seleccionado
    console.log(medico);
  }

  abrirModalImagen(medico: Medico) {
    this.modalImagenService.abrirModal(Tipo.medicos, medico.mid, medico.img);
  }

  abrirModalMedico() {
    this.modalMedicoService.abrirModal();
  }

}
