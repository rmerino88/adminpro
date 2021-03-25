import { environment } from '../../environments/environment';

export class UsuarioTesting {
    public nombre: string;
    public email: string;
    public passwd: string;
    public img: string;
    public google: boolean;
    public role: string;
    public uid: string;
    constructor(nombre, email, passwd, img?, google?, role = 'NO_ROLE', uid?) {
        this.nombre = nombre;
        this.email = email;
        this.passwd = passwd;
        this.img = img;
        this.google = google;
        this.role = role;
        this.uid = uid ? uid : 'ficticio_uid';
    }
}

const baseImageUrl = `${environment.base_url}/upload/usuarios`;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public role: 'ADMIN_ROLE' | 'USER_ROLE' | 'NO_ROLE',
        public img?: string,
        public google?: boolean,
        public uid?: string,
        public passwd?: string
    ) { }

    // Al no ser static no podemos acceder sin crear una instancia
    static populate( usuario ) {
        return new Usuario(usuario.nombre,
            usuario.email,
            usuario.role,
            usuario.img,
            usuario.google,
            usuario.uid,
            usuario.passwd );
    }

    get imagenUrl() {
        if (this.img) {
            // Desde que se le permite modificar las imagenes al ususario
            // no por ser de gogle tiene que ser la imagen de google, se ha podido modificar
            if (this.google && this.img.includes('https')) {
                return this.img;
            } else {
                return `${baseImageUrl}/${this.img}`;
            }
        } else {
            return `${baseImageUrl}/no-image`;
        }
    }
}
