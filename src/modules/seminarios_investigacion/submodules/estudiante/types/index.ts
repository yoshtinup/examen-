
export interface Empty {
  estatus: Estatus;
  datosSeminario: DatosSeminario;
  actas: Acta[];
  datosAlumno: DatosAlumno;
  datosConsejoTutelar: DatosConsejoTutelar[];
  datosCongreso: DatosCongreso[];
  datosEstancias: DatosEstancia[];
  datosCursosExternos: DatosCursosExterno[];
  datosActividades: DatosActividade[];
  datosPublicaciones: DatosPublicacione[];
  catalogoPublicaciones: CatalogoPublicacione[];
  calificacion: Calificacion;
  tieneCongresos: boolean;
  tieneEstancias: boolean;
  tieneCursos: boolean;
  tienePublicaciones: boolean;
}

export interface Acta {
  tipo: string;
  url: string;
}

export interface Calificacion {
  id: number;
  calificacionNumero: number;
  calificacionLetra: string;
}

export interface CatalogoPublicacione {
  idCatalogo: number;
  tipoPublicacion: string;
}

export interface DatosActividade {
  id: number;
  key: number;
  actividad: string;
  meses: string;
}

export interface DatosAlumno {}

export interface DatosCongreso {
  id: number;
  key: number;
  tipoParticipacion: string;
  titulo: string;
  lugar: string;
  fecha: string;
}

export interface DatosConsejoTutelar {
  nombrePersonal: string;
  idParticipacion: number;
  participacion: string;
  firmado: boolean;
}

export interface DatosCursosExterno {
  id: number;
  key: number;
  otraInstitucion: string;
  nombreCurso: string;
  fechaInicio: string;
  fechaConclusion: string;
}

export interface DatosEstancia {
  id: number;
  key: number;
  ambito: string;
  universidadCentro: string;
  areaDeAdscripcion: string;
  fechaInicio: string;
  fechaConclusion: string;
}

export interface DatosPublicacione {
  id: number;
  key: number;
  titulo: string;
  publicacionEn: string;
  tipoParticipacion: string;
  idTipoPublicacion: number;
  tipoPublicacion: string;
  tipoArbitrado: string;
}

export interface DatosSeminario {
  idSeminario: number;
  tituloSeminario: string;
  fechaLimiteEvaluacion: Date;
}

export interface Estatus {
  id: number;
  texto: string;
  esDirector: boolean;
  firmado: boolean;
}


export interface DatosCongreso {
  id: number;
  key: number;
  tipoParticipacion: string;
  titulo: string;
  lugar: string;
  fecha: string;
}

export interface DatosEstancia {
  id: number,
  key: number,
  ambito: string,
  universidadCentro: string,
  areaDeAdscripcion: string,
  fechaInicio: string,
  fechaConclusion: string
}

export interface DatosCursoExterno {
  id: number,
  key: number,
  otraInstitucion: string,
  nombreCurso: string,
  fechaInicio: string,
  fechaConclusion: string
}

export interface DatosActividad {
  id: number,
  key: number,
  actividad: string,
  meses: string
}

export interface Actividades {
  estatus: number,
  datosSeminario: DatosSeminario,
  datosCongreso: DatosCongreso[],
  datosEstancias: DatosEstancia[],
  datosCursosExternos: DatosCursoExterno[],
  datosPublicaciones: DatosPublicacione[],
  datosActividades: DatosActividad[],
  tieneCongresos: boolean,
  tieneEstancias: boolean,
  tieneCursos: boolean,
  tienePublicaciones: boolean,
  congresosEliminados: number[],
  estanciasEliminadas: number[],
  cusrosExternosEliminados: [],
  publicacionesEliminadas: number[],
  actividadesEliminadas: [],
  idAlumnoMaterias: number

}



