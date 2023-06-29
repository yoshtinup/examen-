import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetCursosAlumno(matricula: number) {
  return useQuery(['cursos-alumno', matricula], async () => {
    const data = await hasuraClient.request(
      gql`
        query CursosAlumno($matricula:Int!) {
          Cursos:db12_view_BoletaInscripcion_Matricula_Periodo(where:{Matricula:{_eq:$matricula}} order_by:{FechaIni:asc}){
            NombreMateria
            Clave
            Creditos
            FechaIni
            FechaFin
            IdPeriodo
            PeriodoNombre
    				FechaInicioPeriodo
    				FechaFinPeriodo
            ObligatoriaOptativa
            IdMateriasOfertaAnual
            IdMateriasOfertaClave
            CalificacionNumerico
            IdBoletasIncripciones
    				BoletaInscripcion:db_boletaInscripcion{
              Estatus:db12_CatalogoEstatusInscripcione{
                Descripcion
              }
              IdBoletasIncripciones
              IdCatalogoEstatusInscripciones
              url:NombreArchivo
            }
            BoletaCalificaciones{
              IDMOC
              NombreArchivoBoletaMateria
            }
            EvaluacionSeminario:db12_Seminarios_Evaluaciones{
              SeminariosCatalogoEstatus:db12_Seminarios_CatalogoEstatus{
                Descripcion
                IdSeminarios_CatalogoEstatus
              }
              IdAlumnosMaterias
              IdSeminarios_Evaluaciones
              url_one_drive
            }
    				EvaluacionDocentePendiente:db_EvaluacionDocenteMateria(where:{EstatusEvaluacion:{_eq:3}}){
              MateriasSinEvaluar:db_MateriasSinEvaluar{
                IdMateriasOfertaAnual
              }
            }
            Unidad:db12_MateriasOferataAnual{
              Detalles:db15_Unidad{
                UnidadAdscripcion
              }
            }
            
          }
          CreditosAsignatura: CnsEstudiante_CreditosAsignaturas_Cursadas(where:{Matricula:{_eq:$matricula}}){
            AsingaturasCursadas,
            TotalDeCreditos,
            TotalDeCreditosCubiertos,
            TotalMaterias
          }
          
        }
      `,
      { matricula }
    );
    return data;
  },
  {
    staleTime: Infinity
  });
}
