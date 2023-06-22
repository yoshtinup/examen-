import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '../../../shared/queries/graphQlClient';
import { time } from 'console';
import { DateTimePicker } from '@mui/x-date-pickers';

export function useGetEstudiantesPendientes() {
  return useQuery(['pendientes-info'], async () => {
    const {data} = await hasuraClient.request(
      gql`
      query Inscripciones {
        data: db12_BoletasIncripciones (where:{IdCatalogoEstatusInscripciones:{_eq:1}}) {
          BoletaInscripcion: NombreArchivo
          IdBoletasIncripciones
          Alumno: db12_AlumnoPrograma {
            IdPrograma
            Matricula
            
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
export function useGetOpciones() {
  return useQuery(['opciones-info'], async () => {
    const data = await hasuraClient.request(
      gql`
      query Opciones {
        Programas: db15_Programa {
           IdPrograma
           NombreLargo: Programa
         }
        Unidad: db15_Unidad {
             value: UnidadAdscripcion
             IdUnidad
           }
        FechaCuatri: db12_FechaCuatrimestre {
           CuatrimestreSemestre
           IdFechaCuatrimestre
           Fechainic
           Fechafinc
         }
       }
      `,
      { }
    );
    return data;
  });
}
export function useGetEstudiantesInscritosCancelados(idCatalogoEstatusInscripciones: number, idPrograma?: number, idUnidad?:number) {
 let query="";
 if(idPrograma || idUnidad ){
   if(idPrograma && idUnidad){
    query=`where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}}, 
    db12_AlumnoPrograma: {_and: [{_or: [{IdPrograma: {_eq: ${idPrograma}}}, 
    {IdPrograma: {_is_null: true}}]}, {_or: [{Unidad: {IdUnidad: {_eq: ${idUnidad}}}},
    {Unidad: {IdUnidad: {_is_null: true}}}]}]}}`
  }
  
  else if(idPrograma){
    query=`where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}}, 
    db12_AlumnoPrograma: {_and: [{_or: [{IdPrograma: {_eq: ${idPrograma}}}, 
    {IdPrograma: {_is_null: true}}]}]}}`;
  }
  else if(idUnidad){
    query=`where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}}, 
    db12_AlumnoPrograma: {_and: [{_or: [{Unidad: {IdUnidad: {_eq: ${idUnidad}}}},
    {Unidad: {IdUnidad: {_is_null: true}}}]}]} }`;

  }

 }else {
  query= `where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}}}, order_by:{IdBoletasIncripciones: desc}, limit:500`;
 }
  
  console.log(query);
  return useQuery([`inscritoscancelados-info`], async () => {
    const {data, refetch} = await hasuraClient.request(
      gql`
      query Inscritos{
        data: db12_BoletasIncripciones(${query}) {
          BoletaInscripcion: NombreArchivo
          IdBoletasIncripciones
          Alumno: db12_AlumnoPrograma {
            IdPrograma
            Matricula
            Datos: DatosAlumno {
              Nombre_s_
              ApellidoPaterno
              ApellidoMaterno
            }
            Generacion:Generacion {
              Value: GeneracionLargo
            }
            Programa: Programa {
              NombreLargo: Programa
            }
            AnioDeEstudiosActual: AnioDeEstudios {
              value: AnioActualtxt
            }
            UnidadAdscripcion: Unidad {
              value: UnidadAdscripcion
              IdUnidad
            }
          }
          FechasCuatri: db12_FechaCuatrimestre {
            FechaInicioInscripcion
            FechaFinInscripcion
            CuatrimestreSemestre
            IdFechaCuatrimestre
            Fechainic
            Fechafinc
          }
        }
      }
      `,
      { }
    );
    // console.log('MIS DATOS DB')
     console.log(data)
    // console.log(new Date);
   
    return data;
  }, {
    // enabled:false,
    // staleTime: 0

  });
}