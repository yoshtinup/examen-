import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetTutoresSinodales(matricula: number) {
  return useQuery(['tutores-sinodales', matricula], async () => {
    const { ConsejoTutelar, ConformacionCT } = await hasuraClient.request(
      gql`
        query TutoresSinodales($matricula:Int!){
          ConsejoTutelar (where:{Matricula:{_eq:$matricula}}){
            Persona: PersonalAcademico{
              nombre:Nombre_s_
              ApellidoPaterno
              ApellidoMaterno
              Email
            }
            Nivel:db17_Participacion{
              Participacion
            }    
          }
          ConformacionCT:db18_CT_Conformacion(where:{Matricula:{_eq:$matricula}}){
            Catalogo:db18_CT_CatalogoEstatusGeneral{
              Estatus
            }
          }
        }
      `,
      { matricula }
    );
    return {ConsejoTutelar, ConformacionCT};
  });
}
