export interface DatosActividades {
    nombre: string
    profesores: Profesore[]
  }
  
  export interface Profesore {
    idProfesores: number
    name: string
  }

export interface Actividades {
    IdMateriasOfertaAnual: string
    Matricula: string
    profesores: Profesore[]
    planeacionDelCurso: PlaneacionDelCurso
    valoracionDelCurso: ValoracionDelCurso
  }
  
  export interface Profesore {
    idProfesores: number
    name: string
    respuestas: Respuestas
  }
  
  export interface Respuestas {
    selects: Selects
    textAreas: TextAreas
  }
  
  export interface Selects {
    P_II_5: string
    P_II_6: string
    P_II_7: string
    P_II_8: string
    P_III_9: string
    P_III_10: string
    P_III_11: string
    P_IV_12: string
    P_IV_13: string
    P_IV_14: string
    P_IV_15: string
    P_V_16: string
    P_V_17: string
    P_VI_18_1: string
    P_VI_18_2: string
    P_VI_18_3: string
    P_VI_18_4: string
    P_VI_18_5: string
    P_VI_18_6: string
    P_VI_18_7: string
    P_VI_18_8: string
    P_VI_19_1: string
    P_VI_19_2: string
    P_VI_19_3: string
    P_VI_19_4: string
    P_VI_20: string
    P_VI_21: string
  }
  
  export interface TextAreas {
    Valoracion_P_3: string
    Valoracion_P_4: string
  }
  
  export interface PlaneacionDelCurso {
    P_I_1: string
    P_I_2: string
    P_I_3: string
    P_I_4: string
  }
  
  export interface ValoracionDelCurso {
    Valoracion_P_1: string
    Valoracion_P_2: string
  }
