interface Data {
  EnProceso: EnProceso[];
  Concluidos: Concluidos[];
}

interface EnProceso {
  Matricula: number;
  Num_ronda: number;
  Estatus: Value;
  Alumno: Alumno;
}

interface Concluidos {
  Matricula: number;
  Estatus: Value;
  Alumno: Alumno;
}

interface Alumno {
  Datos: Datos;
  Programa: Value;
  AnioDeEstudios: Value;
  Unidad: Value;
}

interface Value {
  Value: string;
}

interface Datos {
  Nombre: string;
  ApellidoMaterno: string;
  ApellidoPaterno: string;
}

interface Info {
  Integrantes: Integrante[];
}

interface Integrante {
  IdTutorSinodal: number;
  Participacion: string;
  Nombre: string;
  EstatusIndividual?: EstatusIndividual[];
}

interface EstatusIndividual {
  Nombre: string;
  Estatus: string;
  Rol: string;
  Fecha: Date;
  MotivoRechazo?: string;
}

interface CT {
  Integrantes: Integrantes[];
}

interface Integrantes {
  Id: number;
  Participacion: string;
  Nombre: string;
  Estatus: string;
}

interface Cartas {
  integrantes: number[];
  estudiante: boolean;
}

interface ModificacionCt {
  integrantes: number[];
  comentario: string;
}

interface Generaciones {
  generaciones: Generacion[];
}

interface Generacion {
  Generacion: string;
  IdGeneracion: number;
}

export type {
  Data,
  EnProceso,
  Concluidos,
  Info,
  CT,
  Integrante,
  Integrantes,
  EstatusIndividual,
  Cartas,
  ModificacionCt,
  Generaciones,
  Generacion,
};
