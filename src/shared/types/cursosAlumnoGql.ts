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
  CategoriaMateria: DatosCategoriaMateria;
  BoletaInscripcion:BoletaInscripcionGql;
  BoletaCalificaciones:BoletaCalificacionesGql[];
  EvaluacionSeminario:EvaluacionSeminarioGql;
  EvaluacionDocentePendiente:EvaluacionDocentePendienteGql[];
  Unidad:UnidadCursoGql;
  Estatus: Estatus;
}
export interface DatosCategoriaMateria{
    Datos:{
      Value:string
    }
}
export interface BoletaCalificacionesGql{
  IDMOC: number;
  NombreArchivoBoletaMateria: string;
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

export interface UnidadCursoGql{
  Detalles: DetallesUnidadGql;
}

export interface DetallesUnidadGql{
  UnidadAdscripcion: string;
}
