import Roles from "@definitions/Roles";
import { Home, PermMedia, People, Dns } from "@mui/icons-material";
import { CursoGql } from "@shared/types";
import { CardListItemChildrens, CardListType, FontSize } from "@shared/types/cardsTypes";

function ItemFileFunction(url:string){
  const Url = 'https://serviciosposgrado.ecosur.mx/profesores/Content/Cursos/Calificaciones/BoletasEstudiantesMaterias/' + url;
  return () => {window.open(Url)};
}

export function getDataCardCursoFinalizado(curso:CursoGql, currentRol:Roles){
  let data:CardListType = ItemsComunes(curso);
  let Calificacion:CardListItemChildrens = ItemWithChildrens("Calificación", false);
  let Archivos:CardListItemChildrens = ItemWithChildrens("Archivos", false);
  if(currentRol === Roles.Estudiante){
    /*QUEDA PENDIENTE LA VALIDACION DE LAS CALIFICACIONES CON EL ACTA DE EVALUACION*/
    const CalificacionCurso = "Curso: " + curso.CalificacionNumerico.toFixed(1);
    const CalificacionSeminario = "Seminario: " + curso.CalificacionNumerico.toFixed(1);
    Calificacion.Childrens.push(ItemSimple(CalificacionCurso, <People />));
    Calificacion.Childrens.push(ItemSimple(CalificacionSeminario, <Dns />));
    ItemCreateSubtitle(Calificacion);
    data.Items.push(Calificacion);
    if(curso.BoletaCalificacion && curso.BoletaCalificacion.url){
      Archivos.Childrens.push(ItemSimple("Boleta de calificaiones", <People />, ItemFileFunction(curso.BoletaCalificacion.url)));
    }
    /*SUSTITUIR EL CAMPO BoletaCalificacion PARA VALIDAR EL ACTA DE EVALUACION
    if(curso.BoletaCalificacion && curso.BoletaCalificacion.url){
      Archivos.Childrens.push(ItemSimple("Acta de evaluación seminario", <Dns />, ItemFileFunction(curso.BoletaCalificacion.url)));
    }*/
    if(Archivos.Childrens.length > 0){
      ItemCreateSubtitle(Archivos);
      data.Items.push(Archivos);
    }
  }
  return data;
}

export function getDataCardCursoPendiente(curso:CursoGql, currentRol:Roles){
  let data:CardListType = ItemsComunes(curso);
  let Opciones:CardListItemChildrens = ItemWithChildrens("Opciones", true);
  if(currentRol === Roles.Estudiante){
    Opciones.Childrens.push(ItemSimple("Dar de baja materia", <PermMedia />));
    ItemCreateSubtitle(Opciones);
    data.Items.push(Opciones);
  }
  return data;
}

export function getDataCardCursoEnProceso(curso:CursoGql, currentRol:Roles){
  let data:CardListType = ItemsComunes(curso);
  let Opciones:CardListItemChildrens = ItemWithChildrens("Opciones", true);
  if(currentRol === Roles.Estudiante){
    Opciones.Childrens.push(ItemSimple("Evaluación seminario", <People />));
    Opciones.Childrens.push(ItemSimple("Evaluación docente", <Dns />));
    ItemCreateSubtitle(Opciones);
    data.Items.push(Opciones);
  }
  return data;
}

function ItemsComunes(curso:CursoGql){
  return {
    Titulo: curso.NombreMateria,
    Subtitulo: "Estatus: " + curso.Estatus,
    Items: [
      {
        Titulo: curso.ObligatoriaOptativa + " - " + curso.PeriodoNombre,
        FontSize: FontSize.small
      },
      {
        Titulo: "Del " + DateFormat(curso.FechaIni) + " al " + DateFormat(curso.FechaFin),
        FontSize: FontSize.small,
        Icono: <Home />
      }
    ]
  } as CardListType;
}

function DateFormat(fecha:string){
  const dateResponse = new Date(Date.parse(fecha));
  return dateResponse.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
};

const ItemWithChildrens = (nombre:string, open:boolean) => {
  return {
    Titulo: nombre,
    Subtitulo: "",
    FontSize: FontSize.small,
    OpenDefault: open,
    Childrens: []
  } as CardListItemChildrens;
};

const ItemSimple = (titulo:string, icono:React.ReactNode, Onclick?:any) => {
  return {
    Titulo: titulo,
    FontSize: FontSize.small,
    Icono: icono,
    Onclick: Onclick
  } as CardListItemChildrens;
};

const ItemCreateSubtitle = (item:CardListItemChildrens) => {
  item.Childrens.forEach((element, i) => {
    item.Subtitulo += (i > 0) ? ", " : "";
    item.Subtitulo += element.Titulo.split(":")[0];
  });
}
