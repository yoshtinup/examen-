export enum Estatus{
  Finalizado = 'Concluido',
  Pendiente = 'Por iniciar',
  EnProceso = 'En curso'
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
  Estatus: Estatus;
}

export interface CursosAlumnoGql {
  Finalizados: CursoGql[],
  Pendientes: CursoGql[],
  EnProceso: CursoGql[]
}
