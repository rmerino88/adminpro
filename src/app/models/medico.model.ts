export class Medico {

    constructor(
        public nombre: string,
        public email: string,
        public passwd: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ) {}
}
