interface NombreGql {
  nombre: string;
  ApellidoMaterno: string;
  ApellidoPaterno: string;
}

interface PersonalAcademicoGql {
  id: number;
  nombres: NombreGql;
}

interface ArgumentacionGql {
  value: string;
}
interface CodirectorInfoGql {
  SNI: string;
  NumEstDoc: number;
  NumEstMaestria: number;
  NumPubArb: number;
}

interface AsesorExternoGql extends PersonalAcademicoGql {
  idParticipacion: number;
  argumentacion: ArgumentacionGql;
  codirectorInfo: CodirectorInfoGql;
}

export type { PersonalAcademicoGql, AsesorExternoGql };
