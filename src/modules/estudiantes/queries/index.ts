import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '../../../shared/queries/graphQlClient';
import { time } from 'console';
import { DateTimePicker } from '@mui/x-date-pickers';

export function useGetEstudiantes(idEstatus:number, bajas?:boolean) {
  let estudiantesIn;
  if(bajas){
      estudiantesIn=`[4,15,12,5]`;
  }else{
    estudiantesIn=`[${idEstatus}]`;
  }
  return useQuery(['obtener-alumnos-info'], async () => {
    const {data} = await hasuraClient.request(
      gql`
      query ObtenerAlumnos {
        data:AlumnoPrograma(where: {EstatusAlumno: {IdEstatus: {_in: ${estudiantesIn}}}}) {
          DatosAlumno{
            ApellidoMaterno
            ApellidoPaterno
            Nombre_s_
          }
          EstatusAlumno {
            IdEstatus
            Estatus
          }
          Estatus
          Matricula
          Programa {
            IdPrograma
            Programa
          }
          Orientacion
          Unidad {
            IdUnidad
            Unidad
          }
          AnioDeEstudios {
            IdAnioActual
            AnioActualtxt
          }
          Generacion {
            IdGeneracion
            GeneracionCorto
            GeneracionLargo
          }
        }
      }
                  
      `,
      { }
    );
    return data;
  });
}
