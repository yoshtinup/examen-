import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetCursosAlumno(matricula: number) {
  return useQuery(['cursos-alumno', matricula], async () => {
    const { Cursos } = await hasuraClient.request(
      gql`
        query CursosAlumno($matricula:Int!) {
          Cursos:db12_view_BoletaInscripcion_Matricula_Periodo(where:{Matricula:{_eq:$matricula}} order_by:{FechaIni:asc}){
            NombreMateria
            Clave
            Creditos
            FechaIni
            FechaFin
            PeriodoNombre
            ObligatoriaOptativa
            IdMateriasOfertaAnual
            IdMateriasOfertaClave
            CalificacionNumerico
          }
        }
      `,
      { matricula }
    );
    return Cursos;
  });
}
