export enum Estatus{
  Finalizado = 'Concluido',
  Pendiente = 'Por iniciar',
  EnProceso = 'En curso'
}

export interface CursosAlumnoGql {
  Finalizados: CursoGql[],
  Pendientes: CursoGql[],
  EnProceso: CursoGql[]
}

export interface CursoGql {
  NombreMateria: string;
  Clave: string;
  Creditos: number;
  FechaIni: string;
  FechaFin: string;
  IdPeriodo: number;
  PeriodoNombre: string;
  FechaInicioPeriodo: string;
  FechaFinPeriodo: string;
  ObligatoriaOptativa: string;
  IdMateriasOfertaAnual: number;
  IdMateriasOfertaClave: number;
  CalificacionNumerico: number;
  IdBoletasIncripciones: number;
  BoletaInscripcion:BoletaInscripcionGql;
  BoletaCalificacion:BoletaCalificacionGql;
  EvaluacionSeminario:EvaluacionSeminarioGql;
  EvaluacionDocentePendiente:EvaluacionDocentePendienteGql[];
  Estatus: Estatus;
}

export interface BoletaCalificacionGql {
  url: string;
}

export interface BoletaInscripcionGql {
  Estatus: EstatusInscripcion;
  IdBoletasIncripciones: number;
  IdCatalogoEstatusInscripciones: number;
  url: string;
}

export interface EstatusInscripcion {
  Descripcion: string;
}

export interface EvaluacionSeminarioGql {
  SeminariosCatalogoEstatus: SeminariosCatalogoEstatusGql;
  IdAlumnosMaterias: number;
  IdSeminarios_Evaluaciones: number;
  url_one_drive: string;
}

export interface SeminariosCatalogoEstatusGql{
  Descripcion: string;
  IdSeminarios_CatalogoEstatus: number;
}

export interface EvaluacionDocentePendienteGql{
  MateriasSinEvaluar:MateriasSinEvaluarGql;
}

export interface MateriasSinEvaluarGql{
  IdMateriasOfertaAnual:number;
}
