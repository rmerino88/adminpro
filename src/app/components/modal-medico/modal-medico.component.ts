import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { MedicosService } from '../../services/medicos.service';
import { ModalMedicoService } from '../../services/modal-medico.service';
import { HospitalesService } from '../../services/hospitales.service';

import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-modal-medico',
  templateUrl: './modal-medico.component.html',
  styles: [
  ]
})
export class ModalMedicoComponent implements OnInit {

  public medico: Medico;
  public hospitales: Hospital[] = [];

  constructor(private medicosService: MedicosService,
              public modalMedicoService: ModalMedicoService,
              private hospitalesService: HospitalesService) {
    this.medico = new Medico();
  }

  ngOnInit(): void {
      this.hospitalesService.obtenerHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
    });
  }

  cerrarModal() {
    this.modalMedicoService.cerrarModal();
  }

  crearMedico() {
    console.log('Entra a crear  el médico', this.medico);
    if (this.medico.nombre && this.medico.hospital._id) {
      this.medicosService.addMedico(this.medico.nombre, this.medico.hospital._id).subscribe(
        medico => {
          if (medico) {
            Swal.fire(
              'Hecho!',
              `El medico ${medico.nombre} has sido dado de alta en el sistema`,
              'success'
              );
            this.cerrarModal();
            this.modalMedicoService.medicoAniadido.emit(medico.mid);
          }
        }
      );
    } else {
      this.cerrarModal();
      Swal.fire(
        'Error!',
        `El medico debe de tener un nombre y un hospital asociado`,
        'error'
        );
      // this.modalMedicoService.abrirModal();
    }

  }

}
