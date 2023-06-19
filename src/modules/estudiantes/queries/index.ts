import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '../../../shared/queries/graphQlClient';
import { time } from 'console';
import { DateTimePicker } from '@mui/x-date-pickers';

export function useGetEstudiantes(idEstatus:number) {
  return useQuery(['obtener-alumnos-info'], async () => {
    const {data} = await hasuraClient.request(
      gql`
      query ObtenerAlumnos{
        data:Alumnos(where: {db12_AlumnoPrograma:{db12_Estatus:{IdEstatus:{_eq:${idEstatus}}} }}){
          Nombre_s_
          ApellidoPaterno
          ApellidoMaterno
          AlumnoPrograma: db12_AlumnoPrograma{
            Estatus: db12_Estatus{
              IdEstatus
              Estatus
            }
            Matricula
            Programa{
              IdPrograma
              Programa
            }
            Orientacion
            Unidad{
              IdUnidad
              Unidad
            }
            AnioDeEstudios{
              IdAnioActual
              AnioActualtxt
            }
            Generacion{
              IdGeneracion
              GeneracionCorto
              GeneracionLargo
            }
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
export function useGetEstudiantesInscritosCancelados(idCatalogoEstatusInscripciones: number, idPrograma?: number, idUnidad?:number, idFechaCuatrimestre?:number, random?:string) {
 let query="";
 if(idPrograma || idUnidad || idFechaCuatrimestre){
  if(idPrograma && idUnidad && idFechaCuatrimestre){
    query=`where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}}, 
    db12_AlumnoPrograma: {_and: [{_or: [{IdPrograma: {_eq: ${idPrograma}}}, 
    {IdPrograma: {_is_null: true}}]}, {_or: [{Unidad: {IdUnidad: {_eq: ${idUnidad}}}},
    {Unidad: {IdUnidad: {_is_null: true}}}]}]}, db12_FechaCuatrimestre:{_and: [{_or:[{IdFechaCuatrimestre: {_eq: ${idFechaCuatrimestre}} },
    {IdFechaCuatrimestre: {_is_null: true}}] }]}}`;
  }
  else if(idPrograma && idUnidad){
    query=`where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}}, 
    db12_AlumnoPrograma: {_and: [{_or: [{IdPrograma: {_eq: ${idPrograma}}}, 
    {IdPrograma: {_is_null: true}}]}, {_or: [{Unidad: {IdUnidad: {_eq: ${idUnidad}}}},
    {Unidad: {IdUnidad: {_is_null: true}}}]}]}}`
  }
  else if(idPrograma && idFechaCuatrimestre){
    query=`where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}}, 
    db12_AlumnoPrograma: {_and: [{_or: [{IdPrograma: {_eq: ${idPrograma}}}, 
    {IdPrograma: {_is_null: true}}]}]}, 
    db12_FechaCuatrimestre:{_and: [{_or:[{IdFechaCuatrimestre: {_eq: ${idFechaCuatrimestre}} },
    {IdFechaCuatrimestre: {_is_null: true}}] }] }}`;

  }else if(idFechaCuatrimestre && idUnidad){
    query=`where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}}, 
    db12_AlumnoPrograma: {_and: [{_or: [{Unidad: {IdUnidad: {_eq: ${idUnidad}}}},
    {Unidad: {IdUnidad: {_is_null: true}}}]}]}, db12_FechaCuatrimestre:{_and: [{_or:[{IdFechaCuatrimestre: {_eq: ${idFechaCuatrimestre}} },
    {IdFechaCuatrimestre: {_is_null: true}}] }]}}`;
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

  }else if(idFechaCuatrimestre){
    query=`where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}},  
    db12_FechaCuatrimestre:{_and: [{_or:[{IdFechaCuatrimestre: {_eq: ${idFechaCuatrimestre}} },
    {IdFechaCuatrimestre: {_is_null: true}}] }]}}`;
  }

 }else {
  query= `where: {IdCatalogoEstatusInscripciones: {_eq: ${idCatalogoEstatusInscripciones}}}, order_by:{IdBoletasIncripciones: desc}, limit:500`;
 }
  
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