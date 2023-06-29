interface Professor {
  Nombre: {
    Nombre_s_: string;
    ApellidoPaterno: string;
    Email: string;
    Unidad: {
      Value: string;
    };
  };
  TipoDeParticipacion: {
    Value: string;
    IdParticipacion: number;
  };
  PorcentajeParticipacion: number;
  ConstanciaDeParticipacionDocente?: string;
  IdProfesores: number;
}
