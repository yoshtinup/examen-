import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetEstudianteInfo(matricula: number) {
  return useQuery(['estudiante-info', matricula], async () => {
    const { Alumno} = await hasuraClient.request(
      gql`
        query EstudianteInfo($matricula: Int!) {
          Alumno: AlumnoPrograma(where: { Matricula: { _eq: $matricula } }) {
            Matricula: Matricula
            FechaDeIngresoAlPosgrado
            Estatus: Estatus
            Tesis: Tesis
            Orientacion: OrientacionPrograma {
              Id: IdOrientacion
              Nombre: Orientacion
            }
            Generacion {
              Value: GeneracionLargo
            }
            Datos: DatosAlumno {
              Nombre: Nombre_s_
              ApellidoMaterno
              ApellidoPaterno
              Email: CorreoElectronico
              CorreoElectronicoEcosur
              CVU
              IdAlumno
              CURP
              IdGenero
              InmediatoAnterior:db12_FormacionAcademica{
                CarreraOPrograma
                Nivel
                Institucion
                FechaExamenProfesional
                PromedioWeb
              }
            }
            Programa {
              Id: IdPrograma
              NombreLargo: Programa
              NombreCorto: ProgramaCorto
              NumeroDeCreditos: TotalDeCreditos
            }
            AnioDeEstudiosActual: AnioDeEstudios {
              value: AnioActualtxt
            }
            UnidadAdscripcion: Unidad {
              value: UnidadAdscripcion
            }
            DirectorTesis: TutoresSinodales(
              where: { IdParticipacion: { _eq: 1 } }
            ) {
              Persona: PersonalAcademico {
                id: IdPersonalAcademico
                Nombre: Nombre_s_
                ApellidoMaterno
                ApellidoPaterno
              }
            }
            Beca{
              IdTipoDeBeca
            }          
          }
        
        }
      `,
      { matricula }
    );
    return Alumno;
  },
  {
    staleTime: Infinity
  });
}
export function useGetEvaluacionEtica(matricula: number) {

  return useQuery(['evaluacion-etica', matricula], async () => {
    const { EvaluacionEtica } = await hasuraClient.request(
      gql`
        query EstudianteInfo($matricula: Int!) {
          EvaluacionEtica:vw_18_estatus_evaluacion_etica(where:{
            Matricula:{_eq: $matricula}
        }){
            haveestatus
            message
            PuedeRegistrarProtocolo_CEI
            idFormulariosRespuestas
            Descripcion
        }
        
        }
      `,
      { matricula }
    );
    return EvaluacionEtica;
  },
  {
    staleTime: Infinity
  });
}