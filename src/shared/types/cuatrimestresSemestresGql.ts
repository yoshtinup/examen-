import { Estatus, CursoGql, BoletaCalificacionGql, BoletaInscripcionGql } from "./cursosAlumnoGql";

export interface SemestresCuatrimestresGql {
  Finalizados: CSGql[],
  Pendientes: CSGql[],
  EnProceso: CSGql[]
}

export interface CSGql {
  IdPeriodo: number;
  PeriodoNombre: string;
  Creditos: number;
  FechaInicioPeriodo: string;
  FechaFinPeriodo: string;
  Calificacion: number;
  CalificacionPendiente: boolean;
  BoletaInscripcion:BoletaInscripcionGql;
  BoletaCalificacion:BoletaCalificacionGql;
  Cursos: CursoGql[];
  Estatus: Estatus;
}
