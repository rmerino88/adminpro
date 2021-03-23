import { Hospital } from '../models/hospital.model';

export interface HospitalesResponse {
  ok: boolean;
  hospitales: Hospital[];
}