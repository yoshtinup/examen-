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
  PeriodoNombre: string;
  ObligatoriaOptativa: string;
  IdMateriasOfertaAnual: number;
  IdMateriasOfertaClave: number;
  CalificacionNumerico: number;
  BoletaCalificacion:BoletaCalificacionGql
  Estatus: Estatus;
}

export interface BoletaCalificacionGql {
  url: string;
}
