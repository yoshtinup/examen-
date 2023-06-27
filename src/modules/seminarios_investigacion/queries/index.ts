import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '../../../shared/queries/graphQlClient';

export function useGetDataInfo(idEvaluacion: number) {
  return useQuery(['dataID-info', idEvaluacion], async () => {
    const { dataID } = await hasuraClient.request(
      gql`
        query datosSeminario($idEvaluacion:Int!) {
          dataID:db12_Seminarios_Evaluaciones(where:{IdSeminarios_Evaluaciones:{_eq:$idEvaluacion}}){
          alumno:db12_AlumnosMateria{
            Matricula
            MOC:db12_MateriasOferataClave{
              MOA:db12_MateriasOferataAnual{
                Materia:db12_Materia{
                  NombreMateria
                }
              }
            }
          }
          estatus:db12_Seminarios_CatalogoEstatus{
            value:Descripcion
          }        
            IdAlumnosMaterias   
          }
        }
      `,
      { idEvaluacion }
    );
    return dataID;
  });
}

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
    const { Actividades } = await hasuraClient.request(
      gql`
      query datosSeminario($idAlumnoMateria:Int!) {
        Actividades:db12_Seminarios_Evaluaciones(where:{IdAlumnosMaterias:{_eq:$idAlumnoMateria}}){
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
    return Actividades;
  });
}

export function useGetCronogramaInfo(idAlumnoMateria: number) {
  return useQuery(['cronogramaactividades-info', idAlumnoMateria], async () => {
    const { Cronograma } = await hasuraClient.request(
      gql`
      query datosSeminario($idAlumnoMateria:Int!) {
        Cronograma:db12_Seminarios_Evaluaciones(where:{IdAlumnosMaterias:{_eq:$idAlumnoMateria}}){
          programaactividades:db12_Seminarios_ProgramaActividades_1s{
            actividad
            meses
          }
        }
      }        
      `,
      { idAlumnoMateria }
    );
    return Cronograma;
  });
}

export function useGetEvaluacionInfo(idAlumnoMateria: number) {
  return useQuery(['evaluacion-info', idAlumnoMateria], async () => {
    const { Evaluacion } = await hasuraClient.request(
      gql`
        query datosSeminario($idAlumnoMateria:Int!) {
          Evaluacion:db12_Seminarios_Evaluaciones(where:{IdAlumnosMaterias:{_eq:$idAlumnoMateria}}){
            boletaCalificacion:db12_AlumnosMateria{    
              calificacion:db12_Calificacione{
                value:CalificacionLetra
              }
            }
            RecomGenerales
            RecomParticulares
          }
        }      
      `,
      { idAlumnoMateria }
    );
    return Evaluacion;
  });
}

export function useGetArchivosInfo(idAlumnoMateria: number) {
  return useQuery(['archivos-info', idAlumnoMateria], async () => {
    const { Archivos } = await hasuraClient.request(
      gql`
        query datosSeminario($idAlumnoMateria:Int!) {
          Archivos:db12_Seminarios_Evaluaciones(where:{IdAlumnosMaterias:{_eq:$idAlumnoMateria}}){
            urlActa:url_one_drive
            NombreArchivo_Acta
            boletaCalificacion:db12_AlumnosMateria{    
              url:NombreArchivoBoletaMateria
            }
          }
        }          
      `,
      { idAlumnoMateria }
    );
    return Archivos;
  });
}