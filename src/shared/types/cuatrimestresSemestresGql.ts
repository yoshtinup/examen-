import { Estatus, CursoGql, BoletaCalificacionesGql, BoletaInscripcionGql } from "./cursosAlumnoGql";

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
  BoletaCalificaciones:BoletaCalificacionesGql[];
  Cursos: CursoGql[];
  Estatus: Estatus;
}
