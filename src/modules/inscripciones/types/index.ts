export interface EstudiantePendiente {
  data: Data;
}

export interface Data {
  Inscripcion: Inscripcion[];
}

export interface Inscripcion {
  BoletaInscripcion?: string;
  IdBoletasIncripciones?: number;
  Alumno?: {
    IdPrograma?: number;
    Matricula?: string;
    Datos: {
      Nombre_s_?: string;
      ApellidoPaterno?: string;
      ApellidoMaterno?: string;
    };
    Generacion?: {
      Value?: string;
    };
    Programa?: {
      NombreLargo?: string;
    };
    AnioDeEstudiosActual?: { Value?: string };
    UnidadAdscripcion?: {
      value?: string;
      IdUnidad?: number;
    };
  };
  FechasCuatri?: {
    FechaInicioInscripcion?: string;
    FechaFinInscripcion?: string;
    CuatrimestreSemestre?: string;
    IdFechaCuatrimestre?: number;
    Fechainic?: string;
    Fechafinc?: string;
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
export interface ProgramaUnidad {
  label?: string;
  value?: any;
}
