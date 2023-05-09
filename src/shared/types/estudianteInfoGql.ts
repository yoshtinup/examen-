export interface EstudianteGql {
  Matricula: number;
  FechaDeIngresoAlPosgrado:string;
  Estatus: string;
  Tesis: string;
  Orientacion: OrientacionGql;
  Generacion: GeneracionGql;
  Datos: DatosGql;
  Programa: ProgramaGql;
  AnioDeEstudiosActual: ValueGql;
  UnidadAdscripcion: ValueGql;
  DirectorTesis: DirectorTesisGql[];
  Beca: BecaGql;
}

export interface ValueGql {
  value: string;
}

export interface DatosGql {
  Nombre: string;
  ApellidoMaterno: string;
  ApellidoPaterno: string;
  Email: string;
  CorreoElectronicoEcosur: string;
  CVU: number;
  IdAlumno: number;
  CURP: string;
  IdGenero: number;
  InmediatoAnterior:InmediatoAnteriorGql;
}

export interface DirectorTesisGql {
  Persona: PersonaGql;
}

export interface PersonaGql {
  id: number;
  Nombre: string;
  ApellidoMaterno: string;
  ApellidoPaterno: string;
}

export interface GeneracionGql {
  Value: string;
}

export interface OrientacionGql {
  Id: number;
  Nombre: string;
}

export interface ProgramaGql {
  Id: number;
  NombreLargo: string;
  NombreCorto: string;
  NumeroDeCreditos: number;
}

export interface BecaGql {
  IdTipoDeBeca: number;
}

export interface InmediatoAnteriorGql{
  CarreraOPrograma: string;
  Nivel: string;
  Institucion: string;
  FechaExamenProfesional: string;
  PromedioWeb: string;
}
