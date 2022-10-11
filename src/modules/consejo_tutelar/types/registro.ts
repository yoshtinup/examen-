import { Codirector } from './integrantesCT';

export class AsesorExterno {
  id?: number;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombre: string;
  email: string;
  institucion: string;
  grado: string;
  idParticipacion: number;
  argumentacion: string;
  codirectorInfo?: Codirector;
  fileName: string;
}

export class IntegrantesCTList {
  externos?: AsesorExterno[];
  internos: number[];
}
