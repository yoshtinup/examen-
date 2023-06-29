import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetCursosAIniciar(doctorado:boolean) {
  const date = new Date().toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  //Cursos:CnsI_ayb_02_MateriasDisponibles(where:{FechaLimiteAltaYBaja:{_gte:$date}` + queryPlus + `}){
  const queryPlus = doctorado ? ', GradoGeneral:{_eq:"Doctorado"}' : '';
  return useQuery(['cursos-a-iniciar', date], async () => {
    const { Cursos } = await hasuraClient.request(
      gql`
        query CursosAIniciar($date:datetime!) {
          Cursos:CnsI_ayb_02_MateriasDisponibles(where:{FechaLimiteAltaYBaja:{_lte: "'$'{new Date().toISOString()}"} ` + queryPlus + `){
            Creditos
            FechaFinCurso:FechaIni
            FechaInicioCurso:FechaFin
            fechaLimiteAltaACurso:FechaLimiteAltaYBaja
            Clave
            Profesor_responsable
            NombreMateria
            IdMateriasOfertaAnual
            GradoDeCurso:ProgramaCorto
            SedeDeCurso:Unidad
          }
        }
      `,
      { date }
    );
    return Cursos;
  },
  {
    staleTime: Infinity
  });
}
