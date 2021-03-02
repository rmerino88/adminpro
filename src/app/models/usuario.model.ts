export class UsuarioTesting {
    public nombre: string;
    public email: string;
    public passwd: string;
    public img: string;
    public google: boolean;
    public role: string;
    public uid: string;
    constructor(nombre, email, passwd, img?, google?, role = 'NO_ROLE', uid? ) {
        this.nombre = nombre;
        this.email = email;
        this.passwd = passwd;
        this.img = img;
        this.google = google;
        this.role = role;
        this.uid = uid ? uid : 'ficticio_uid';

    }
}

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public passwd: string,
        public img?: string,
        public google?: boolean,
        public role: string = 'NO_ROLE',
        public uid?: string
    ) {}
}
