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
              IdGenero
              Grado
            }
            Nivel:db17_Participacion{
              Participacion
              IdParticipacion
            }    
          }
          ConformacionCT:db18_CT_Conformacion(where:{Matricula:{_eq:$matricula}}){
            Catalogo:db18_CT_CatalogoEstatusGeneral{
              Estatus
              IDEstatus
            }
            ActaDeConformacionComite:db18_CT_CartaAceptacionEstudiante{
              URL
            }

          }
        }
      `,
      { matricula }
    );
    return {ConsejoTutelar, ConformacionCT};
  },
  {
    staleTime: Infinity
  });
}
