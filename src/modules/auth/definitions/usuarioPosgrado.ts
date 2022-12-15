import Roles from '@definitions/Roles';

export interface Personal {
  correo: string;
  nombreCompleto: string;
  identificadorBDI?: number;
  identificadorPosgrado: number;
  nombreDepartamento?: string;
  nombreGrupo?: string;
  nombreUnidad?: string;
  idUnidadBDI?: string;
  idUnidadPosgrado: number;
  claveUnidadPosgrado: string;
  idGrupo?: number;
  idDpto?: number;
  tipo: string;
  sexo?: string;
  orientaciones?: number[];
  roles: Roles[];
}

export interface Estudiante {
  idAlumno: number;
  correo: string;
  nombreCompleto: string;
  nombrePrograma: string;
  clavePrograma: number;
  nombreUnidad: string;
  claveUnidad: string;
  idUnidad: string;
  matricula: number;
  nombreDirectorTesis: string;
  correoDirectorTesis: string;
  nombreCoordinadorUnidad: string;
  correoCoordinadorUnidad: string;
  nombreServiciosEscolares: string;
  correoServiciosEscolares: string;
  sexo: string;
  estatus: string;
  idOrientacion: number;
  nombreOrientacion: string;
}

export interface EcosurAuth {
  personal?: Personal;
  estudiante?: Estudiante;
}

export interface AuthCode {
  token_type: string;
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
}

export interface AuthToken {
  token: string;
}
