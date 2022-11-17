import { EstudianteGql } from '@shared/types';

export interface EstatusCTGql {
  Estatus: EstatusInfoCTGql;
}

interface EstatusInfoCTGql {
  Id: number;
  Leyenda: string;
}

export interface EstudianteCT extends EstudianteGql {
  IdEstatusCT: number;
  LeyendaEstatusCT: string;
}
