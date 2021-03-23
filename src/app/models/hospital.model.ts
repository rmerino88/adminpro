interface _UsuarioInterface {
    nombre: string;
    email: string;
    img?: string;
    _id: string;
}

export class Hospital {

    constructor(
        public nombre: string,
        public img?: string,
        public usuario?: _UsuarioInterface | string,
        public _id?: string,
    ) {}
}
