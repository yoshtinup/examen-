import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '../../../shared/queries/graphQlClient';

export function useGetIntegrantesInfo(IdEvaluacionSeminario: number) {
  return useQuery(['integrantesct-info', IdEvaluacionSeminario], async () => {
    const { IntegrantesCT } = await hasuraClient.request(
      gql`
        query getEstatusEvaluacionCTSeminario($IdEvaluacionSeminario: Int!) {
          IntegrantesCT: db12_Seminarios_FirmasTutores(where: {IdSeminarios_Evaluaciones: {_eq: $IdEvaluacionSeminario}}){
            FechaFirmaTutor
            Datos:db17_TutoresSinodale{
              Participacion:db17_Participacion{
                Value:Participacion
              }
            Persona: PersonalAcademico{
                ApellidoMaterno
                ApellidoPaterno
                Nombre:Nombre_s_
                Email
              }
            }
          }
        }      
      `,
      { IdEvaluacionSeminario }
    );
    return IntegrantesCT;
  });
}

export function useGetActividadesInfo(idAlumnoMateria: number) {
  return useQuery(['actividadesestudiante-info', idAlumnoMateria], async () => {
    const { Evaluacion } = await hasuraClient.request(
      gql`
      query datosSeminario($idAlumnoMateria:Int!) {
        Evaluacion:db12_Seminarios_Evaluaciones(where:{IdAlumnosMaterias:{_eq:$idAlumnoMateria}}){
          IdAlumnosMaterias
          idEvaluacion:IdSeminarios_Evaluaciones
          estatus:db12_Seminarios_CatalogoEstatus{
            value:Descripcion
          }
          publicaciones:db12_Seminarios_Actividades_Publicaciones{
            titulo
            Annio
            publicadoen
            tipoparticipacion
            tipoarbitrado    
          }
          cursos:db12_Seminarios_Actividades_CursosFueraECOSURs{
            nombrecurso
            fechainicio
            Fechaconclusion
            institucion:otrainstitucion    
            
          }
          programaactividades:db12_Seminarios_ProgramaActividades_1s{
            actividad
            meses
          }
          estancias:db12_Seminarios_Actividades_Estancias{
            centro:universidad_centro
            area:areaadscripcion
            ambito
            fechainicio
            fechaconclusion    
          }
          congresos:db12_Seminarios_Actividades_Congresos{
            titulo
            tipoparticipacion
            lugar
            fecha    
          }
        }
      }        
      `,
      { idAlumnoMateria }
    );
    return Evaluacion;
  });
}
