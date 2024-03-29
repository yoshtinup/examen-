import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetAsignaturaRegistroCompleto(IdMateriasOfertaAnual: number) {
  return useQuery(['asignatura-registro-completo', IdMateriasOfertaAnual], async () => {
    const { Materia } = await hasuraClient.request(
      gql`
      query query($IdMateriasOfertaAnual:Int!){
        Materia:db12_MateriasOferataAnual(where: {IdMateriasOfertaAnual: {_eq: $IdMateriasOfertaAnual}}) {
          IdMateriasOfertaAnual
          FechaLimiteAltaYBaja
          FechaInicioEntregaCalificaciones
          FechaLimiteEntregaCalificaciones
          CursoCancelado
          FechaCancelacionCurso
          EstatusRegistroDocentes:catalogoEstatusRegistroDocentesPorcentaje{
            Descripcion
            IdcatalogoEstatusRegistroDocentesPorcentajes
          }
          ConcentradoCalificacionesAlumnos:NombreArchivoConcentrado
          EstatusAsignacionCalificacion: db12_CatalogoEstatusFirmado {
            Nombre: Descripcion
            Id: IdCatalogoEstatusFirmado
          }
          EvaluacionDocente:db18_EvaluacionDocente{      
            Estatus:db18_EvaluacionDocente_CatalogoEstatusEvaluacion{
              Nombre: descripcion
              Id:idEvaluacionDocente_CatalogoEstatusEvaluacion
            }
          }
          Unidad: db15_Unidad {
            IdUnidad
            Nombre: Unidad
          }
          Alumnos: db12_MateriasOferataClave {
            IdMateriasOfertaClave
            Listado: db12_AlumnosMaterias {        
              EvaluacionSeminario:db12_Seminarios_Evaluaciones_Array{
                Estatus:db12_Seminarios_CatalogoEstatus{
                  IdSeminarios_CatalogoEstatus
                  Descripcion
                }
              }
              IdAlumnoMateria: IdAlumnosMaterias
              Matricula
              Calificacion:db12_Calificacione{
                EnLetra:CalificacionLetra
                Numerica:CalificacionNumerico
              }
              CambioEnAsignatura:db12_CatalogoEstatusAltasYBajasMateria{
                Descripcion
                Id:IdCatalogoEstatusAltasYBajasMaterias
              }
              Estudiante: db12_AlumnoPrograma {
                EvaluacionDocente:db18_EvaluacionDocente_EvaluacionEstudiantes{
                  Evaluo:db18_EvaluacionDocente{
                    EstatusEvaluacion             
                  }
                }
                IdAlumno
                Datos: DatosAlumno {
                  Nombre_s_
                  ApellidoPaterno
                  ApellidoMaterno
                }
              }
              BoletaCalificaciones:NombreArchivoBoletaMateria
            }
          }
          Datos: db12_FechaTrimestre {
            Periodo:db12_Trimestre{
              Nombre:trimnombre
              Id:IdTrimestre
            }      
            Fechas: db12_Fecha {
              FechaInicioAsignatura: FechaIni
              FechaFinAsignatura: FechaFin
              FechaInicioPeriodo:FechaInicioPeriodo
              FechaFinPeriodo:FechaFinPeriodo
            }
          }
        
          Asignatura: db12_MateriasOferataClave {      
            Datos: db12_ClaveMaterium {
              Clave
              CategoriaMateria
              Nombre:db12_Materia{
                Valor:NombreMateria
                ObligatoriaOptativa
                Horas
                Creditos
                
              }
              Programa: db15_Programa {
                Id: IdPrograma
                Nombre: Programa
              }
            }
          }
      
        }
      }
      `,
      { IdMateriasOfertaAnual }
    );
    return Materia;
  });
}
