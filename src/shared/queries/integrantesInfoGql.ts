import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetIntegrantesInfo(IdEvaluacionSeminario: number) {
  return useQuery(['integrantesct-info', IdEvaluacionSeminario], async () => {
    const { IntegrantesCT } = await hasuraClient.request(
      gql`
        query getEstatusEvaluacionCTSeminario($IdEvaluacionSeminario: Int!) {
          IntegrantesCT: db12_Seminarios_FirmasTutores(where: {IdSeminarios_Evaluaciones: {_eq: $IdEvaluacionSeminario}}){
            FechaFirmaTutor
            Datos:db17_TutoresSinodale{
              Participacion:db17_Participacion{
                Value:Participacion
              }
            Persona: PersonalAcademico{
                ApellidoMaterno
                ApellidoPaterno
                Nombre:Nombre_s_
                Email
              }
            }
          }
        }      
      `,
      { IdEvaluacionSeminario }
    );
    return IntegrantesCT;
  });
}
