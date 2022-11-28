export interface IntegrantesCT {
  data: Integrante;
}

export interface Integrante {
  IntegrantesCT: IntegrantesCTElement[];
}

export interface IntegrantesCTElement {
  FechaFirmaTutor: string;
  Datos:           Datos;
}

export interface Datos {
  Participacion: Participacion;
  Persona:       Persona;
}

export interface Participacion {
  Value: string;
}

export interface Persona {
  ApellidoMaterno: string;
  ApellidoPaterno: string;
  Nombre:          string;
  Email:           string;
}
