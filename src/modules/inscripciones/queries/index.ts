import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '../../../shared/queries/graphQlClient';

export function useGetEstudiantesPendientes() {
  return useQuery(['pendientes-info'], async () => {
    const { Inscripcion } = await hasuraClient.request(
      gql`
        query Pendientes {
          Inscripcion:db12_view_BoletaInscripcion_filtro{
            Estudiante
            Matricula
            emailEstudiante
            Programa
            UnidadAdscripcion
            Curso
            Clave
            Creditos
            Cuatrimestre
            FechaInicioInscripcion
            FechaFinInscripcion
            Iniciocurso
            Fincurso    
          }
        }                
      `,
      { }
    );
    return Inscripcion;
  });
}
