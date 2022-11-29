import { hasuraClient } from '@shared/queries';
import { gql } from 'graphql-request';

export async function getALLConformacionesCT(idGeneracion: number = 0) {
  const result = await hasuraClient.request(
    gql`
      query getALLConformacionesCT($idGeneracion: Int!) {
        EnProceso: db18_CT_Conformacion(
          where: { IDEstatus: { _nin: [7, 8] } }
        ) {
          IDConformacion
          Matricula
          Num_ronda
          Estatus: db18_CT_CatalogoEstatusGeneral {
            Value: Estatus
          }
          Alumno: db12_AlumnoPrograma {
            Datos: DatosAlumno {
              Nombre: Nombre_s_
              ApellidoMaterno
              ApellidoPaterno
            }
            Programa {
              Value: Programa
            }
            AnioDeEstudios {
              Value: AnioActualtxt
            }
            Unidad {
              Value: UnidadAdscripcion
            }
          }
        }
        Concluidos: db18_CT_Conformacion(
          where: {
            _and: [
              { IDEstatus: { _in: [7, 8] } }
              { db12_AlumnoPrograma: { IdGeneracion: { _eq: $idGeneracion } } }
            ]
          }
        ) {
          Matricula
          Estatus: db18_CT_CatalogoEstatusGeneral {
            Value: Estatus
          }
          Alumno: db12_AlumnoPrograma {
            Datos: DatosAlumno {
              Nombre: Nombre_s_
              ApellidoMaterno
              ApellidoPaterno
            }
            Programa {
              Value: Programa
            }
            AnioDeEstudios {
              Value: AnioActualtxt
            }
            Unidad {
              Value: UnidadAdscripcion
            }
          }
        }
      }
    `,
    { idGeneracion }
  );
  return result;
}
