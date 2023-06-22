export interface EstudiantePendiente {
  data: Data;
}

export interface Data {
  Inscripcion: Estudiante[];
}

export interface Estudiante {
  DatosAlumno: {
    ApellidoMaterno: string;
    ApellidoPaterno: string;
    Nombre_s_: string;
  };
  EstatusAlumno: {
    IdEstatus: number;
    Estatus: string;
  };
  Estatus: string;
  Matricula: number;
  Programa: {
    IdPrograma: number;
    Programa: string;
  };
  Orientacion: string;
  Unidad: {
    IdUnidad: number;
    Unidad: string;
  };
  AnioDeEstudios: {
    IdAnioActual: number;
    AnioActualtxt: string;
  };
  Generacion: {
    IdGeneracion: number;
    GeneracionCorto: string;
    GeneracionLargo: string;
  };
}

export interface ProgramaOpciones {
  IdPrograma: number;
  NombreLargo: string;
}
export interface UnidadOpciones {
  value: string;
  IdUnidad: number;
}
export interface FechaCuatriOpciones {
  CuatrimestreSemestre: string;
  IdFechaCuatrimestre: number;
  Fechainic: string;
  Fechafinc: string;
}
export interface FiltroEstudiante {
  label?: string;
  value?: any;
}
