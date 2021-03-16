import { Usuario } from '../models/usuario.model';

export interface UsuariosResponse {
  total: number;
  resultado: Usuario[];
}