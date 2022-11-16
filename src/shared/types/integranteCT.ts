
export interface IntegrantesCT {
  data: Data;
}

export interface Data {
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

export interface integranteInfo {
  nombre: string,
  participacion: string,
  evaluacion: string | Date,
  email: string,
};