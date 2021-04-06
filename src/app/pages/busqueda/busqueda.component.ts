import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BusquedasService } from '../../services/busquedas.service';

import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [ `
    .avatar-mini {
      width: 60px;
      border-radius: 10%;
    }`
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private busquedasService: BusquedasService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.buscarTodo(term);
    });
  }

  buscarTodo(term: string) {
    this.busquedasService.buscarTodo(term).subscribe(({usuarios, hospitales, medicos}) => {
      this.usuarios = usuarios;
      this.hospitales = hospitales;
      this.medicos = medicos;
    });
  }

  abrirMedico(medico: Medico){
    this.router.navigateByUrl(`/dashboard/medico/${medico.mid}`);
  }
}
