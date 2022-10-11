import { Codirector } from './integranteCT';

export interface AsesorExterno {
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
};

export interface IntegrantesCTList {
  externos?: AsesorExterno[];
  internos: number[];
};

export interface EvaluacionIntegrante {
  aprobo: boolean;
  comentario?: string;
};

export interface EvaluacionComite extends EvaluacionIntegrante {
  id: number;
};
