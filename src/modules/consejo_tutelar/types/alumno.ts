interface Alumno {
  idPersonalAcademico?: number;
  matricula: number;
  Nombre?: string;
  idOrientacion?: number;
  orientacion?: string;
  idPrograma?: number;
  programa?: string;
  generacion?: string;
  idUnidad?: number;
  idDirectorTesis?: number;
  evaluadoPorIntegrantesCT?: boolean;
  evaluadoPorResponsableOrientacion?: boolean;
  evaluadoPorCordinacionUnidad?: boolean;
  evaluadoPorIntegranteCT?: boolean;
  statusGeneral: number;
  leyendaEstatusGeneral?: string;
};
export default Alumno;
