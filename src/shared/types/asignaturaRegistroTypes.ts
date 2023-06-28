export interface AsignaturaRegistroCompleto {
  IdMateriasOfertaAnual: number;
  FechaLimiteAltaYBaja: string;
  FechaInicioEntregaCalificaciones: string;
  FechaLimiteEntregaCalificaciones: string;
  CursoCancelado: string;
  FechaCancelacionCurso: string;
  EstatusRegistroDocentes: {
    Descripcion: string;
    IdcatalogoEstatusRegistroDocentesPorcentajes: number;
  };
  ConcentradoCalificacionesAlumnos: string;
  EstatusAsignacionCalificacion: {
    Nombre: string;
    Id: number;
  };
  EvaluacionDocente: {
    Estatus: {
      Nombre: string;
      Id: number;
    };
  };
  Unidad: {
    IdUnidad: number;
    Nombre: string;
  };
  Alumnos: {
    IdMateriasOfertaClave: number;
    Listado: {
      EvaluacionSeminario: {
        Estatus: {
          IdSeminarios_CatalogoEstatus: number;
          Descripcion: string;
        };
      };
      IdAlumnoMateria: number;
      Matricula: number;
      Calificacion: {
        EnLetra: string;
        Numerica: number;
      };
      CambioEnAsignatura: {
        Descripcion: string;
        Id: number;
      };
      Estudiante: {
        EvaluacionDocente: {
          Evaluo: {
            EstatusEvaluacion: number;
          };
        };
        IdAlumno: number;
        Datos: {
          Nombre_s_: string;
          ApellidoPaterno: string;
          ApellidoMaterno: string;
        };
      };
      BoletaCalificaciones: string;
    };
  };
  Datos: {
    Periodo: {
      Nombre: string;
      Id: number;
    };
    Fechas: {
      FechaInicioAsignatura: string;
      FechaFinAsignatura: string;
      FechaInicioPeriodo: string;
      FechaFinPeriodo: string;
    };
  };

  Asignatura: {
    Datos: {
      Clave: string;
      CategoriaMateria:string;
      Nombre: {
        Valor: string;
        ObligatoriaOptativa: string;
        Horas: number;
        Creditos: number;
      };
      Programa: {
        Id: number;
        Nombre: string;
      };
    };
  };
}


export interface ListadoAlumnos{
        EvaluacionSeminario: {
          Estatus: {
            IdSeminarios_CatalogoEstatus: number;
            Descripcion: string;
          };
        };
        IdAlumnoMateria: number;
        Matricula: number;
        Calificacion: {
          EnLetra: string;
          Numerica: number;
        };
        CambioEnAsignatura: {
          Descripcion: string;
          Id: number;
        };
        Estudiante: {
          EvaluacionDocente: {
            Evaluo: {
              EstatusEvaluacion: number;
            };
          };
          IdAlumno: number;
          Datos: {
            Nombre_s_: string;
            ApellidoPaterno: string;
            ApellidoMaterno: string;
          };
        };
        BoletaCalificaciones: string;
}