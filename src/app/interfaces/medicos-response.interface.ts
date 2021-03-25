import { Medico } from '../models/medico.model';

export interface MedicosResponse {
  ok: boolean;
  medicos: Medico[];
}

export interface MedicoResponse {
  ok: boolean;
  medico: Medico;
}