interface _HospitalMedico {
    _id: string;
    nombre: string;
    img: string;
}

export class Medico {
    constructor(
        public nombre?: string,
        public hospital?: _HospitalMedico,
        public img?: string,
        public mid?: string,
    ) {
        if (!hospital) {
            this.hospital = { _id: '', nombre: '', img: '' };
        }
    }
}


