import GraficaCursos from "./submodules/grafica";
import CardsCursos from "./submodules/cards-cursos";
import { useGetCursosAlumno } from "@shared/queries";
import { CursoGql, CursosAlumnoGql, Estatus } from "@shared/types";

function getCursosEstudiante(matricula:number){
  const listaCursos = useGetCursosAlumno(matricula);
  let arrayCursos:CursosAlumnoGql = {
    Finalizados: [],
    Pendientes: [],
    EnProceso: []
  };
  listaCursos?.data?.forEach((curso:CursoGql) => {
    if(Date.now() > Date.parse(curso.FechaFin)){
      curso.Estatus = Estatus.Finalizado;
      arrayCursos.Finalizados.push(curso);
    }else if(Date.now() < Date.parse(curso.FechaIni)){
      curso.Estatus = Estatus.Pendiente;
      arrayCursos.Pendientes.push(curso);
    }else{
      curso.Estatus = Estatus.EnProceso;
      arrayCursos.EnProceso.push(curso);
    }
  });
  return arrayCursos;
}

const TableroPlanEstudios = () => {
  const arrayCursos:CursosAlumnoGql = getCursosEstudiante(202221005/*202122015*/);
  return (
    <>
      <GraficaCursos data={arrayCursos} />
      <CardsCursos data={arrayCursos} />
    </>
  );
};

export default TableroPlanEstudios;
