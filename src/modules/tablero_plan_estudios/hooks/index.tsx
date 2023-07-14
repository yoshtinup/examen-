import { CursoGql, CursosAlumnoGql, Estatus } from "@shared/types";
import { CSGql, SemestresCuatrimestresGql } from "@shared/types/cuatrimestresSemestresGql";
import AsignaturasQuerys from "../submodules/datos-generales/apiAsignaturas"
import { QueryClient } from "react-query";
import Swal from "sweetalert2";

export function getCursosEstudiante(listaCursos: any) {
  let arrayCursos: CursosAlumnoGql = {
    Finalizados: [],
    Pendientes: [],
    EnProceso: [],
  };
  listaCursos?.forEach((curso: CursoGql) => {
    curso.Estatus = getEstatus(curso.FechaIni, curso.FechaFin);
    if (curso.Estatus == Estatus.Finalizado) {
      arrayCursos.Finalizados.push(curso);
    } else if (curso.Estatus == Estatus.Pendiente) {
      arrayCursos.Pendientes.push(curso);
    } else {
      arrayCursos.EnProceso.push(curso);
    }
  });
  arrayCursos.Finalizados.sort((a, b) => {
    if (a.FechaFin > b.FechaFin) return -1;
    if (a.FechaFin < b.FechaFin) return 1;
    return 0;
  });
  return arrayCursos;
}

export function getCuatrimestresSemestres(listaCursos: any) {
  let ids: number[] = [];
  let CuaSem: CSGql[] = [];
  let arrayCS: SemestresCuatrimestresGql = {
    Finalizados: [],
    Pendientes: [],
    EnProceso: [],
  };
  listaCursos?.forEach((curso: CursoGql) => {
    if (!ids.includes(curso.IdPeriodo)) {
      CuaSem[curso.IdPeriodo] = {
        ...curso,
        CalificacionPendiente: CalificacionPendiente(curso),
        Calificacion: curso.CalificacionNumerico,
        Cursos: [curso],
        Estatus: getEstatus(curso.FechaInicioPeriodo, curso.FechaFinPeriodo),
      };
      ids.push(curso.IdPeriodo);
    } else {
      let currentCS = CuaSem[curso.IdPeriodo];
      let Numerador = 0;
      let Denominador = 0;
      if(!currentCS.BoletaInscripcion && curso.BoletaInscripcion){
        currentCS.BoletaInscripcion = curso.BoletaInscripcion;
      }
      currentCS.Creditos += curso.Creditos;
      currentCS.Cursos.push(curso);
      currentCS.Cursos.forEach(curso => {
        if(!CalificacionPendiente(curso)){
          Numerador += curso.CalificacionNumerico;
          Denominador += 1;
        }
      });
      currentCS.Calificacion = Numerador/Denominador;
      currentCS.CalificacionPendiente = !CalificacionPendiente(curso)
        ? currentCS.CalificacionPendiente
        : true;
    }
  });
  CuaSem.forEach(CS => {
    if (CS.Estatus == Estatus.Finalizado) {
      arrayCS.Finalizados.push(CS);
    } else if (CS.Estatus == Estatus.Pendiente) {
      arrayCS.Pendientes.push(CS);
    } else {
      arrayCS.EnProceso.push(CS);
    }
  });
  return arrayCS;
}

function getEstatus(FechaIni: string, FechaFin: string) {
  let estatus: Estatus;
  if (Date.now() > Date.parse(FechaFin)) {
    estatus = Estatus.Finalizado;
  } else if (Date.now() < Date.parse(FechaIni)) {
    estatus = Estatus.Pendiente;
  } else {
    estatus = Estatus.EnProceso;
  }
  return estatus;
}

function CalificacionPendiente(curso: CursoGql){
  if(curso.BoletaCalificaciones && curso.BoletaCalificaciones[0] &&
    curso.BoletaCalificaciones[0].IDMOC == curso.IdMateriasOfertaClave &&
    curso.BoletaCalificaciones[0].NombreArchivoBoletaMateria &&
    curso.BoletaCalificaciones[0].NombreArchivoBoletaMateria != ""
  ){
    return false;
  }else{
    return true;
  }
}

export async function GenerarConstanciaEstudios(matricula: number){
  const queryClient = new QueryClient();
  try {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      icon: 'info',
      text: 'Se está generando una constancia de estudios',
      timer: 15000,
      timerProgressBar: true,
    });
    const result = await queryClient.fetchQuery(
      ['genaerar-constancia-de-estudios'],
      () => AsignaturasQuerys.postGenerarConstanciaDeEstudios(matricula)
    );
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      icon: 'success',
      text: result.message,
      timer: 2000,
      timerProgressBar: true,
    });
  } catch (err) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      icon: 'error',
      text: 'Ha ocurrido un error al tratar de generar la constancia',
      timer: 2000,
      timerProgressBar: true,
    });
  }
};