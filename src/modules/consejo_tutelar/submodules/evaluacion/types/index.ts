import { EstudianteGql } from '@shared/types';

export interface EstatusCTGql {
  Estatus: EstatusInfoCTGql;
}

interface EstatusInfoCTGql {
  Id: number;
  Leyenda: string;
}

export interface EstudianteCT extends EstudianteGql {
  IdEstatusCT: number;
  LeyendaEstatusCT: string;
}

export interface Rechazados {
  Rechazados: Rechazado[];
}

export interface Rechazado {
  RazonRechazo: string;
  Ronda: number;
  RolQueRechazo: string;
  Academico: Academico;
}

export interface Academico {
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Nombre: string;
  Grado: string;
}
