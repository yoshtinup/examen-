import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '@shared/queries';
import { EstatusCTGql } from '../types';

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
