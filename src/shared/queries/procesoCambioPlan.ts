import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetProcesoCambioPlanEstudios(matricula: number) {
  return useQuery(['plan-estudios', matricula], async () => {
    const { Plan } = await hasuraClient.request(
      gql`
      query EnProcesoCambioPlanEstudio($matricula: Int!) {
        Plan: db12_AlumnosMaterias(where: {Matricula: {_eq: $matricula}, IdCatalogoEstatusAltasYBajasMaterias: {_eq: 1}}) { 
          Estatus: db12_CatalogoEstatusAltasYBajasMateria {
            Descripcion
          }
          Materia: db12_MateriasOferataClave {
            Curso: db12_ClaveMaterium {
              Nombre: db12_Materia {
                Valor: NombreMateria
              }
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
