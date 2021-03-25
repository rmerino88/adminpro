import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';

export interface BusquedaCompletaResponse {
  ok: boolean;
  msg: string;
  usuarios: Usuario[];
  hospitales: Hospital[];
  medicos: Medico[];
}