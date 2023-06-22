export interface AsignaturaGql {
  IdMateriasOfertaAnual: number;
  Unidad: UnidadAsignaturaGql;
  Datos: DatosAsignaturaGql;
  Asignatura: AsignaturaAsignaturaGql;
}

export interface UnidadAsignaturaGql {
  Id: number;
  Nombre: string;
}

export interface DatosAsignaturaGql {
  Periodo: PeriodoAsignaturaGql;  
  FechasAsignatura: FechasAsignaturaGql;
}

export interface PeriodoAsignaturaGql {
  Nombre: string;
  Id: number;
}

export interface FechasAsignaturaGql {
  FechaInicio: string;
  FechaFin: string;
}

export interface AsignaturaAsignaturaGql {
  Datos: DatosAsigAsigGql;
}

export interface DatosAsigAsigGql {
  Nombre: NombreAsignatura;
  Programa: ProgramaAsignatura;
}

export interface NombreAsignatura {
  valor: string;
}

export interface ProgramaAsignatura {
  Id: number;
  Nombre: string;
}
