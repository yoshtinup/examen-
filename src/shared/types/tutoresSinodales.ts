export interface TutoresSinodalesGql {
  ConsejoTutelar: DatosConsejoTutelarGql[];
  ConformacionCT: ConformacionCTGql[];
}

export interface DatosConsejoTutelarGql {
  Persona: PersonaCT;
  Nivel: NivelCT;
}

export interface ConformacionCTGql {
  Catalogo: CatalogoCT;
}

export interface PersonaCT{
  nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Email: string;
}

export interface NivelCT{
  Participacion: string;
}

export interface CatalogoCT{
  Estatus: string;
}
