import { Codirector } from './integranteCT';
export interface PersonalAcademico {
  id?: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface AsesorExterno extends PersonalAcademico {
  email: string;
  institucion: string;
  grado: string;
  idParticipacion: number;
  argumentacion: string;
  codirectorInfo?: Codirector;
  fileName: string;
}

export interface IntegrantesCTList {
  externos?: AsesorExterno[];
  internos: number[];
}

export interface EvaluacionIntegrante {
  aprobo: boolean;
  comentario?: string;
}

export interface EvaluacionComite extends EvaluacionIntegrante {
  id: number;
}
