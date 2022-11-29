import { hasuraClient } from '@shared/queries';
import { gql } from 'graphql-request';

export async function getALLConformacionesCT(year: number) {
  const result = await hasuraClient.request(
    gql`
      query getALLConformacionesCT($year: Int!) {
        EnProceso: db18_CT_Conformacion(
          where: { IDEstatus: { _nin: [7, 8] }, Anio: { _eq: $year } }
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
          where: { IDEstatus: { _in: [7, 8] } }
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
    { year }
  );
  return result;
}
