import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetProcesoCambioPlanEstudios(matricula: number) {
  return useQuery(['plan-estudios', matricula], async () => {
    const { Plan } = await hasuraClient.request(
      gql`
        query EnProcesoCambioPlanEstudio ($matricula: Int!){
          Plan: db12_AlumnosMaterias(
            where: {
              Matricula: { _eq: $matricula }
              IdCatalogoEstatusAltasYBajasMaterias: { _eq: 1 }
            }
          ) {
            IDMOC
            Estatus: db12_CatalogoEstatusAltasYBajasMateria {
              Descripcion
            }
            Materia: db12_MateriasOferataClave {
              curso: db12_ClaveMaterium {
                CursoSeminario
              }
            }
          }
        }
      `,
      { matricula }
    );
    return Plan;
  });
}
