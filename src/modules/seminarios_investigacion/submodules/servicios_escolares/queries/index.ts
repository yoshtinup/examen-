import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '../../../../../shared/queries/graphQlClient';

export function useGetSeminariosEnProceso(anio: number) {
  return useQuery(['seminariosenproceso-info', anio], async () => {
    const { seminariosEnProceso } = await hasuraClient.request(
      gql`
      query evaluaciones($anio: Int!) {
        seminariosEnProceso:db12_Seminarios_Evaluaciones(where: {_and: [{ db12_AlumnosMateria:{db12_MateriasOferataClave:{db12_MateriasOferataAnual:{db12_FechaTrimestre:{db12_Fecha:{db15_Anio:{Anio:{_eq:$anio}}}}}}}  }    {IdSeminarios_CatalogoEstatus:{_nin:4}}]} ) {
            IdEvaluacion:IdSeminarios_Evaluaciones
            estatus:db12_Seminarios_CatalogoEstatus{
              Id:IdSeminarios_CatalogoEstatus
              Descripcion
            }
            Alumno:db12_AlumnosMateria {
              Programa:db12_AlumnoPrograma {
        Programa{Value:Programa }
                UnidadAdscripcion:Unidad {
                  ID:IdUnidad
                  Nombre:Unidad
                }
                datos:DatosAlumno{
                  Nombre:Nombre_s_
                  ApellidoPaterno
                  ApellidoMaterno
                }
              }
              Materia:db12_MateriasOferataClave {
                Data:db12_MateriasOferataAnual {
                  Detalles:db12_Materia {           
                    Nombre:NombreMateria            
                  }
                  Periodo:db12_FechaTrimestre {
                    Trimestre
                    Fecha:db12_Fecha {
                      Inicio:FechaIni
                      Fin:FechaFin    
         Anio:db15_Anio{
                        Value:Anio
                      }          
                    }
                  }
                }
              }
            }
          }
        }            
      `,
      { anio }
    );
    return seminariosEnProceso;
  });
}

export function useGetSeminariosConcluidos(anio: number) {
  return useQuery(['seminariosconcluidos-info', anio], async () => {
    const { seminariosConcluidos } = await hasuraClient.request(
      gql`
        query evaluaciones($anio: Int!) {
          seminariosConcluidos:db12_Seminarios_Evaluaciones(where: {_and: [{ db12_AlumnosMateria:{db12_MateriasOferataClave:{db12_MateriasOferataAnual:{db12_FechaTrimestre:{db12_Fecha:{db15_Anio:{Anio:{_eq:$anio}}}}}}}} {IdSeminarios_CatalogoEstatus:{_in:4}}]} ) {
            IdEvaluacion:IdSeminarios_Evaluaciones
            Alumno:db12_AlumnosMateria {
              Programa:db12_AlumnoPrograma {
        Programa{Value:Programa }
                UnidadAdscripcion:Unidad {
                  ID:IdUnidad
                  Nombre:Unidad
                }
                datos:DatosAlumno{
                  Nombre:Nombre_s_
                  ApellidoPaterno
                  ApellidoMaterno
                }
              }
              Materia:db12_MateriasOferataClave {
                Data:db12_MateriasOferataAnual {
                  Detalles:db12_Materia {
                  
                    Nombre:NombreMateria
                  
                  }
                  Periodo:db12_FechaTrimestre {
                    Trimestre
                    Fecha:db12_Fecha {
                      Inicio:FechaIni
                      Fin:FechaFin  
        Anio:db15_Anio{
                        Value:Anio
                      }            
                    }
                  }
                }
              }
            }
          }
        }                   
      `,
      { anio }
    );
    return seminariosConcluidos;
  });
}

export function useGetEstatus() {
  return useQuery(['estatus-info'], async () => {
    const { estatus } = await hasuraClient.request(
      gql`
        query CatalogoEstatusEvaluacionSeminario {
          estatus:db12_Seminarios_CatalogoEstatus(where:{IdSeminarios_CatalogoEstatus:{_neq:5}}){
          Descripcion
            ID:IdSeminarios_CatalogoEstatus
          }
        }                  
      `,
    );
    return estatus;
  });
}
