import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from './graphQlClient';

export function useGetAsignaturaRegistroCompleto(IdMateriasOfertaAnual: number) {
  return useQuery(['asignatura-registro-completo', IdMateriasOfertaAnual], async () => {
    const { Materia } = await hasuraClient.request(
      gql`
        query asignaturaRegistroCompleto($IdMateriasOfertaAnual:Int!) {
          Materia:db12_MateriasOferataAnual(where: {IdMateriasOfertaAnual: {_eq:$IdMateriasOfertaAnual}}) {
            IdMateriasOfertaAnual
            FechaLimiteAltaYBaja
            FechaInicioEntregaCalificaciones
            FechaLimiteEntregaCalificaciones
            CursoCancelado
            FechaCancelacionCurso
            PorcentajeReportado
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
            alumnos: db12_MateriasOferataClave {
              IdMateriasOfertaClave
              listado: db12_AlumnosMaterias {
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
                estudiante: db12_AlumnoPrograma {
                  IdAlumno
                  datos: DatosAlumno {
                    Nombre_s_
                    ApellidoPaterno
                    ApellidoMaterno
                  }
                }
                boletaCalificaciones:NombreArchivoBoletaMateria
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
                Nombre:db12_Materia{
                  valor:NombreMateria
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
            Profesores: db17_Profesores {
              IdProfesor: IdProfesores
              PorcentajeParticipacion
              DatosPersona: db17_PersonalAcademico {
                Id: IdPersonalAcademico
                Nombre: Nombre_s_
                ApellidoMaterno
                ApellidoPaterno
                Email
              }
              Participacion: db17_Participacion {
                Id: IdParticipacion
                Nombre: Participacion
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
