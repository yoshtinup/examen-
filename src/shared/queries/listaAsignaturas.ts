import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetListaAsignaturasProcesoIniciar(){
  return useQuery(['lista-asignaturas-proceso-iniciar'], async () => {
    const { Asignaturas } = await hasuraClient.request(
      getQuery("IdCatalogoEstatusFirmado: {_nin: [3,4]},", "CursoCancelado: {_eq: false}")
    );
    return { Asignaturas };
  },
  {
    staleTime: Infinity
  });
}

export function useGetListaAsignaturasConcluidas(){
  return useQuery(['lista-asignaturas-concluidas'], async () => {
    const { Asignaturas } = await hasuraClient.request(
      getQuery("IdCatalogoEstatusFirmado: {_in: [3,4]},", "CursoCancelado: {_eq: false}")
    );
    return { Asignaturas };
  },
  {
    staleTime: Infinity
  });
}

export function useGetListaAsignaturasCanceladas(){
  return useQuery(['lista-asignaturas-canceladas'], async () => {
    const { Asignaturas } = await hasuraClient.request(
      getQuery("CursoCancelado: {_eq: true}", "")
    );
    return { Asignaturas };
  },
  {
    staleTime: Infinity
  });
}

function getQuery(parametro1: string, parametro2: string){
  return gql`query queryListaAsignaturas {
    Asignaturas:db12_MateriasOferataAnual(
      where: {` + parametro1 + parametro2 + `}
    ){
      IdMateriasOfertaAnual
      Unidad: db15_Unidad {
        Id:IdUnidad
        Nombre: Unidad
      }
      Datos: db12_FechaTrimestre {
        Periodo:db12_Trimestre{
          Nombre:trimnombre
          Id:IdTrimestre
        }      
        FechasAsignatura: db12_Fecha {
          FechaInicio: FechaIni
          FechaFin: FechaFin
        }
      }
      Asignatura: db12_MateriasOferataClave {      
        Datos: db12_ClaveMaterium {
          Nombre:db12_Materia{
            valor:NombreMateria
          }
          Programa: db15_Programa {
            Id: IdPrograma
            Nombre: Programa
          }
        }
      }
    }
  }`
}