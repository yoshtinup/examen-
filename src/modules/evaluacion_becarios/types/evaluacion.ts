export interface EvaluacionGql {
  db12_EvaluacionBecario: Db12EvaluacionBecario[];
}

export interface Db12EvaluacionBecario {
  Estatus: Estatus;
  PorcentajeAvance: number;
  FechaEvaluacion: Date;
  Acta: string;
  Recomendacion: Estatus;
  PeriodoEvaluacion: PeriodoEvaluacion;
}

export interface Estatus {
  Value: string;
}

export interface PeriodoEvaluacion {
  Semestre: Estatus;
}
