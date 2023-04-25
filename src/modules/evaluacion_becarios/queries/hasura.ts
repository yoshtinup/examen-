import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '@shared/queries';

export async function getEvaluaciones(matricula: number = 202221005) {
  const result = await hasuraClient.request(
    gql`
      query Evaluciones($matricula: Int!) {
        db12_EvaluacionBecario(
          where: { Matricula: { _eq: $matricula }, IdEvaluacionBecario_CatalogoEstatus: { _eq: 4} }
          order_by: { FechaEvaluacionBecario: desc }
        ) {
          Estatus: db12_EvaluacionBecario_CatalogoEstatus {
            Value: Descripcion
          }
          PorcentajeAvance
          FechaEvaluacion: FechaEvaluacionBecario
          Acta: NombreArchivo_Evaluacion
          Recomendacion: db12_EvaluacionBecario_CatalogoRecomendacionesEvaluacion {
            Value: Descripcion
          }
          PeriodoEvaluacion: db12_EvaluacionBecario_FechasEvaluacion {
            Semestre: db12_Trimestre {
              Value: trimnombre
            }
          }
        }
      }
    `,
    { matricula }
  );
  return result;
}
