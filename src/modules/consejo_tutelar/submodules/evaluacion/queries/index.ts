import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '@shared/queries';
import { EstatusCTGql, Rechazados } from '../types';

export function useGetEstudianteCTEstatus(matricula: number) {
  return useQuery<EstatusCTGql[]>(
    ['ct-estudiante-estatus', matricula],
    async () => {
      const { ConformacionCT } = await hasuraClient.request(
        gql`
          query estatusConformacionCT($matricula: Int! = 202225101) {
            ConformacionCT: db18_CT_Conformacion(
              where: { Matricula: { _eq: $matricula } }
            ) {
              Estatus: db18_CT_CatalogoEstatusGeneral {
                Id: IDEstatus
                Leyenda: Estatus
              }
            }
          }
        `,
        { matricula }
      );
      return ConformacionCT;
    }
  );
}

export function useGetIntegrantesCTRechazados(matricula: number) {
  return useQuery<Rechazados[]>(
    ['ct-estudiante-rechazados', matricula],
    async () => {
      const { CT } = await hasuraClient.request(
        gql`
          query integrantesCTRechazados($matricula: Int!) {
            CT: db18_CT_Conformacion(
              where: { Matricula: { _eq: $matricula } }
            ) {
              Rechazados: db18_CT_IntegrantesRechazados {
                RazonRechazo
                Ronda
                RolQueRechazo: Rol
                Academico: db17_PersonalAcademico {
                  ApellidoPaterno
                  ApellidoMaterno
                  Nombre: Nombre_s_
                  Grado
                }
              }
            }
          }
        `,
        { matricula }
      );
      return CT;
    }
  );
}
