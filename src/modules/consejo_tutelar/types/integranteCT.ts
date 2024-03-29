export interface EstatusIndividual {
  nombre: string;
  estatus: string;
  rol: string;
  fecha: string;
  motivoRechazo?: string;
}

export interface Codirector {
  sNI: string;
  numPubArb: number;
  numEstMaestria: number;
  numEstDoc: number;
}

export interface IntegrantePerfil {
  idTutorSinodal: number;
  nombre?: string;
  unidad?: string;
  grado?: string;
  gradoGeneral?: string;
  correo?: string;
  idParticipacion?: number;
  participacion?: string;
  url?: string;
  insitucion?: string;
  argumentacion?: string;
  estatusGeneral?: string;
  tipoAcademico: string;
}

export interface IntegranteCT extends IntegrantePerfil {
  evaluadoPorGP: boolean;
  evaluadoPorRO: boolean;
  evaluadoPorCUP: boolean;
  estatusIndividual?: EstatusIndividual[];
  datosCodirector?: Codirector;
  cartaAceptacion?: string;
}
