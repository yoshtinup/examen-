interface Alumno {
  idPersonalAcademico?: number;
  matricula: number;
  nombre?: string;
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
  estatusGeneral: number;
  leyendaEstatusGeneral?: string;
}
export default Alumno;
