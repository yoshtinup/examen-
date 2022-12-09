import { EstudianteGql } from '@shared/types';

export interface ExtraInfoAlumnoCTGql {
  CartaAceptacion?: string;
  EstatusGeneral: string;
  LeyendaEstatusGeneral: string;
}

export interface EstudianteCT extends EstudianteGql {
  IdEstatusCT: number;
  LeyendaEstatusCT: string;
  CartaAceptacion?: string;
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
