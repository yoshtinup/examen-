export interface DatosMateria {
  idMateriasOfertaAnual: number;
  nombre?: string;
  matricula?: string;
}

export interface Profesor {
  idProfesores: number;
  name?: string;
}

export interface Actividades extends DatosMateria {
  profesores: Profesor[];
  planeacionDelCurso: PlaneacionDelCurso;
  valoracionDelCurso: ValoracionDelCurso;
}

export interface Profesor {
  idProfesores: number;
  name?: string;
  respuestas?: Respuestas;
}

export interface Respuestas {
  selects: Selects;
  textAreas: TextAreas;
}

export interface Selects {
  p_II_5: number;
  p_II_6: number;
  p_II_7: number;
  p_II_8: number;
  p_III_9: number;
  p_III_10: number;
  p_III_11: number;
  p_IV_12: number;
  p_IV_13: number;
  p_IV_14: number;
  p_IV_15: number;
  p_V_16: number;
  p_V_17: number;
  p_VI_18_1: number;
  p_VI_18_2: number;
  p_VI_18_3: number;
  p_VI_18_4: number;
  p_VI_18_5: number;
  p_VI_18_6: number;
  p_VI_18_7: number;
  p_VI_18_8: number;
  p_VI_19_1: number;
  p_VI_19_2: number;
  p_VI_19_3: number;
  p_VI_19_4: number;
  p_VI_20: number;
  p_VI_21: number;
}

export interface TextAreas {
  valoracion_P_3: string;
  valoracion_P_4: string;
}

export interface PlaneacionDelCurso {
  p_I_1: number;
  p_I_2: number;
  p_I_3: number;
  p_I_4: number;
}

export interface ValoracionDelCurso {
  valoracion_P_1: string;
  valoracion_P_2: string;
}
