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
  ActaDeConformacionComite:ActaDeConfromacionCT;
}

export interface PersonaCT{
  nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Email: string;
  IdGenero: number;
  Grado: string;
}

export interface NivelCT{
  Participacion: string;
  IdParticipacion: number;
}

export interface CatalogoCT{
  Estatus: string;
  IDEstatus:number;
}

export interface ActaDeConfromacionCT{
  url:string;
}
