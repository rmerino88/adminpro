export interface RegisterForm {
  nombre: string;
  email: string;
  passwd: string;
  passwd2: string;
  terminos: boolean;
}

export interface LoginForm {
  email: string;
  passwd: string;
  recuerdame: boolean;
}

export interface ModifyForm {
  nombre: string;
  email: string;
  role: string;
}
