import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetEstudianteInfo(matricula: number) {
  return useQuery(['estudiante-info', matricula], async () => {
    const { Alumno } = await hasuraClient.request(
      gql`
        query EstudianteInfo($matricula: Int!) {
          Alumno: AlumnoPrograma(where: { Matricula: { _eq: $matricula } }) {
            Matricula: Matricula
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
              CVU
              IdAlumno
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
          }
        }
      `,
      { matricula }
    );
    return Alumno;
  });
}
