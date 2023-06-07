export interface EstudiantePendiente {
  data: Data;
}

export interface Data {
  Inscripcion: Inscripcion[];
}

export interface Inscripcion {
  Alumno: {
    Datos: {
      Nombre_s_: string;
      ApellidoPaterno: string;
      ApellidoMaterno: string;
    };
    Generacion: {
      Value: string;
    };
    Programa: {
      NombreLargo: string;
    };
    AnioDeEstudiosActual: { Value: string };
    UnidadAdscripcion: {
      value: string;
    };
  };
  FechasCuatri:{
    FechaInicioInscripcion: string;
    FechaFinInscripcion: string;
    CuatrimestreSemestre: string;
  };
}

export interface ProgramaUnidad {
  label: string;
  value: any;
}
