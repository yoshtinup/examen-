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

export type { Data, EnProceso, Concluidos };
