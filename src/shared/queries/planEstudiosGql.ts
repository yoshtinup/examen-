import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetPlanEstudios(matricula: number) {

  return useQuery(['plan-estudios', matricula], async () => {
    const { Plan } = await hasuraClient.request(
      gql`
      query PlanDeEstudios {
        Plan: CnsI_ayb_01_PlanEstudios(where: {
            FechaLimiteAltaYBaja: {
             _gte: "'$'{DATE_TRUNC('month', NOW())}"
             _lte: "'$'{DATE_TRUNC('month', NOW())} + '1 month'::interval - '1 day'::interval, '$'{DATE_TRUNC('day', NOW())}"
            }
           Matricula: {_eq:  $matricula}
          }){
          CategoriaMateria
          Clave
          Creditos
          Curso_o_cuatrimestre
          Direct
          Estatus
          FechaLimiteAltaYBaja
          Fecha_de_inicio
          Fecha_de_termino
          IdAlumnosMaterias
          IdCatalogoEstatusAltasYBajasMaterias
          IdMateriasOfertaClave
          IdTutorSinodal
          Materia
          MateriaBaja
          Matricula
          ObligatoriaOptativa
          Orientacion
          Programa
          Unidad
          
        }
      }
      `,
      { matricula }
    );
    return Plan;
  });
}
