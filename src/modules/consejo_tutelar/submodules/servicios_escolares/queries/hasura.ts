import { useQuery } from 'react-query';
import { hasuraClient } from '@shared/queries';
import { gql } from 'graphql-request';

export async function getALLConformacionesCT() {
  const result = await hasuraClient.request(
    gql`
      query getALLConformacionesCT {
        EnProceso: db18_CT_Conformacion(
          where: { IDEstatus: { _nin: [7, 8] } }
        ) {
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
    `
  );
  return result;
}

export async function getConformacionesConcluidas(idGeneracion: number) {
  const result = await hasuraClient.request(
    gql`
      query getConformacionesConcluidas($idGeneracion: Int!) {
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

export async function getGenerationsList() {
  const result = await hasuraClient.request(
    gql`
      query getGenerationsList {
        generaciones: db18_vw_CTGeneraciones {
          Generacion
          IdGeneracion
        }
      }
    `
  );
  return result;
}

export async function getCT(matricula: number) {
  const result = await hasuraClient.request(
    gql`
      query ConsejoTutelar($matricula: Int!) {
        Integrantes: db18_vw_CTAlumnosAsesores(
          where: { Matricula: { _eq: $matricula } }
        ) {
          IdTutorSinodal
          Participacion
          Nombre
          EstatusIndividual
        }
      }
    `,
    { matricula }
  );
  return result;
}
