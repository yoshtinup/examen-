interface DataPersonaGql {
  nombre: string;
  ApellidoMaterno: string;
  ApellidoPaterno: string;
  Institucion: string;
  Email: string;
  Grado: string;
}

interface PersonalAcademicoGql {
  id: number;
  dataPersona: DataPersonaGql;
}

interface DatosExtraGql {
  Argumentacion: string;
  UrlCV: string;
}
interface CodirectorInfoGql {
  SNI: string;
  NumEstDoc: number;
  NumEstMaestria: number;
  NumPubArb: number;
}

interface AsesorExternoGql extends PersonalAcademicoGql {
  idParticipacion: number;
  datosExtra: DatosExtraGql;
  codirectorInfo: CodirectorInfoGql;
}

export type { PersonalAcademicoGql, AsesorExternoGql };
