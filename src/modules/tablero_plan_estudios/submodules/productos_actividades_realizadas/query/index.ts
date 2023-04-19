import { hasuraClient } from '@shared/queries';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';

//export function useGetListaPersonalExterno(IdGrado: number) {
export function useGetProductosActividadesRealizadas(matricula: number) {
  return useQuery(['productos-actividades-realizadas', matricula], async () => {
    const { db12_AlumnosMaterias } = await hasuraClient.request(
      gql`
        query datosSeminario($matricula: Int!) {
          db12_AlumnosMaterias(
            where: {
              Matricula: { _eq: $matricula }
              db12_Seminarios_Evaluaciones_Array: {
                IdAlumnosMaterias: { _is_null: false }
              }
            }
          ) {
            db12_Seminarios_Evaluaciones_Array {
              FechaFirmaActa
              publicaciones: db12_Seminarios_Actividades_Publicaciones {
                nombre: titulo
                annio: Annio
                publicadoen
                tipoparticipacion
                tipoarbitrado
              }
              cursos: db12_Seminarios_Actividades_CursosFueraECOSURs {
                nombre: nombrecurso
                fechainicio
                fechaconclusion: Fechaconclusion
                institucion: otrainstitucion
              }
              estancias: db12_Seminarios_Actividades_Estancias {
                nombre: universidad_centro
                area: areaadscripcion
                ambito
                fechainicio
                fechaconclusion
              }
              congresos: db12_Seminarios_Actividades_Congresos {
                nombre: titulo
                tipoparticipacion
                lugar
                fecha
              }
            }
          }
        }
      `,
      { matricula }
    );
    return db12_AlumnosMaterias;
  });
}
