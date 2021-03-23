import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { MedicosService } from '../../../services/medicos.service';

import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import { Tipo } from '../../../models/tipos.model';

import { HospitalesService } from '../../../services/hospitales.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
    `img {
      width: 80%;
      display: block;
      margin: 0px auto;
      margin-bottom: 15px;
      /* No funcionan las animaciones */
      -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
      -moz-animation: fadein 2s; /* Firefox < 16 */
      -ms-animation: fadein 2s; /* Internet Explorer */
      -o-animation: fadein 2s; /* Opera < 12.1 */
      animation: fadein 2s;
    }`
  ]
})
export class MedicoComponent implements OnInit, OnDestroy {

  public medicoSeleccionado: Medico;
  public hospitales: Hospital[];
  public medicoForm: FormGroup;

  public hospitalSeleccionado: Hospital;

  private imgSubs: Subscription;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalImagenService: ModalImagenService,
    private medicosService: MedicosService,
    private hospitalesService: HospitalesService) {

  }

  ngOnInit(): void {

    // Suscribimos al cambio de la imagen
    this.imgSubs = this.modalImagenService.imgCambiada.subscribe((img) => this.medicoSeleccionado.img = img);

    // Rellenamos los hospitales disponibles en el select
    this.hospitalesService.obtenerHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
    });

    // Inicializamos el formgroup vacío, después se setean sus valores
    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      hospital: ['', [Validators.required]],
    });

    // Como trabajamos con formularios reactivos podemos observar los elementos de este
    this.medicoForm.get('hospital').valueChanges.subscribe(
      (hospitalId) => {
        console.log(hospitalId);
        this.cambiarImagenHospital(hospitalId);
      });

    // Obtenemos el médico correpondiente al id de la url
    // const KEY = 'id';
    // this.activatedRoute.params.subscribe( (params) => {
    this.activatedRoute.params.subscribe(({ id }) => {
      // const mid = params[KEY];
      if (id !== 'new') {
        // this.medicosService.getMedicoById(mid).subscribe(
        this.medicosService.getMedicoById(id).subscribe(
          (medico) => {
            if (!medico) {
              this.router.navigateByUrl('/dashboard/medicos');
            }
            const { nombre, hospital: { _id } } = medico;
            this.medicoSeleccionado = medico;
            this.hospitalSeleccionado = this.medicoSeleccionado.hospital;
            this.medicoForm.setValue({ nombre, hospital: _id });
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  medicoFormSubmit() {
    if (this.medicoSeleccionado) {
      this.actualizarMedico();
    } else {
      this.crearMedico();
    }
  }

  crearMedico() {
    this.medicosService.addMedico(this.medicoForm.value.nombre, this.medicoForm.value.hospital).subscribe(
      medico => {
        if (medico) {
          Swal.fire(
            'Hecho!',
            `El medico ${medico.nombre} ha sido dado de alta en el sistema`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/medico/${medico.mid}`);
        }
      }
    );
  }

  actualizarMedico() {
    this.medicosService.editMedico(
      this.medicoSeleccionado.mid,
      this.medicoForm.value.nombre,
      this.medicoForm.value.hospital).subscribe(
        medico => {
          // Setear al objeto medico los valores nuevos
          if (medico) {
            Swal.fire({
              title: 'Proceso finalizado!',
              text: 'La información del médico ha sido actualizada con éxito',
              icon: 'info',
              confirmButtonText: 'Entendido!'
            });
            this.router.navigateByUrl('/dashboard/medicos');
          }
        },
        err => {
          console.warn('Médico edit err:', err.error.msg);
          Swal.fire({
            title: 'Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Entendido!'
          });
        },
        () => console.log(`Complete!`)
      );
  }

  cambiarImagenHospital(idHospital: string) {
    // const hospital = this.hospitales.filter(hosp => hosp._id === idHospital);
    // const hospital = this.hospitales.find(hosp => hosp._id === idHospital);
    // this.hospitalImg = hospital.img;
    this.hospitalSeleccionado = this.hospitales.find(hosp => hosp._id === idHospital);
  }

  abrirModalImagen() {
    this.modalImagenService.abrirModal(Tipo.medicos, this.medicoSeleccionado.mid, this.medicoSeleccionado.img);
  }
}
