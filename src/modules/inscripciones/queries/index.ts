import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '../../../shared/queries/graphQlClient';

export function useGetEstudiantesPendientes() {
  return useQuery(['pendientes-info'], async () => {
    const {data} = await hasuraClient.request(
      gql`
      query Inscripciones {
        data: db12_BoletasIncripciones (where:{IdCatalogoEstatusInscripciones:{_eq:1}}) {
          Alumno: db12_AlumnoPrograma {
            Datos:DatosAlumno {
              Nombre_s_
              ApellidoPaterno
              ApellidoMaterno
            }
           Generacion: Generacion {
              Value: GeneracionLargo
            }
            Programa: Programa {
              NombreLargo: Programa
            }
            AnioDeEstudiosActual: AnioDeEstudios {
            value:AnioActualtxt
          }
          UnidadAdscripcion: Unidad {
            value:UnidadAdscripcion
          }
      
          }
          FechasCuatri: db12_FechaCuatrimestre {
            FechaInicioInscripcion
            FechaFinInscripcion
            CuatrimestreSemestre
          }
        }
      }             
      `,
      { }
    );
    return data;
  });
}
