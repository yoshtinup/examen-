import Roles from "@definitions/Roles";
import { Home, PermMedia, People, Dns } from "@mui/icons-material";
import { CardListItemChildrens, CardListType, FontSize } from "@shared/types/cardsTypes";
import { CSGql } from "@shared/types/cuatrimestresSemestresGql";

function ItemFileFunction(url:string){
  const Url = process.env.URL_BOLETAS_INSCRIPCIONES + url;
  return () => {window.open(Url)};
}

export function getDataCardCSFinalizado(CS:CSGql, currentRol:Roles, Inscribirse:any){
  let data:CardListType = ItemsComunes(CS);
  let Inscrito:Boolean = false;
  let x:number;

  let Calificacion:CardListItemChildrens = ItemWithChildrens("Calificación", true);
  if(CS.Calificacion){
    let nota = CS.CalificacionPendiente ? " - ¡¡¡ calificaciones pendientes !!!" : "";
    Calificacion.Childrens.push(ItemSimple("Curso: " + CS.Calificacion.toFixed(2) + nota, <People />));
    ItemCreateSubtitle(Calificacion);
    data.Items.push(Calificacion);
  }

  let Archivos:CardListItemChildrens = ItemWithChildrens("Enlaces", true);
  for(x=0; x<CS.Cursos.length; x+=1){
    if(CS.Cursos[x].BoletaInscripcion && CS.Cursos[x].BoletaInscripcion.url){
      Archivos.Childrens.push(ItemSimple("Boleta de inscripción", <People />, ItemFileFunction(CS.Cursos[x].BoletaInscripcion.url)));
      Inscrito = true;
      break;
    }
  }
  if(!Inscrito){
    Archivos.Childrens.push(ItemSimple("Inscribirse", <People />, () => Inscribirse()));
  }
  for(x=0; x<CS.Cursos.length; x+=1){
    if(CS.Cursos[x].BoletaCalificacion && CS.Cursos[x].BoletaCalificacion.url){
      Archivos.Childrens.push(ItemSimple("Concentrado de calificaciones", <Dns />, ItemFileFunction(CS.Cursos[x].BoletaCalificacion.url)));
      break;
    }
  }
  ItemCreateSubtitle(Archivos);
  data.Items.push(Archivos);

  let Cursos:CardListItemChildrens = ItemWithChildrens("Cursos", true);
  for(x=0; x<CS.Cursos.length; x+=1){
    Cursos.Childrens.push(ItemSimple(CS.Cursos[x].NombreMateria + " (Del " + DateFormat(CS.Cursos[x].FechaIni) + " al " + DateFormat(CS.Cursos[x].FechaFin) + ")", <Dns />));
  }
  ItemCreateSubtitle(Cursos);
  data.Items.push(Cursos);

  return data;
}

export function getDataCardCSPendiente(CS:CSGql, currentRol:Roles){
  let data:CardListType = ItemsComunes(CS);
  return data;
}

export function getDataCardCSEnProceso(CS:CSGql, currentRol:Roles){
  let data:CardListType = ItemsComunes(CS);
  return data;
}

function ItemsComunes(CS:CSGql){
  return {
    Titulo: CS.PeriodoNombre,
    Subtitulo: "Estatus: " + CS.Estatus,
    Items: [
      {
        Titulo: "Total créditos - " + CS.Creditos,
        FontSize: FontSize.small
      },
      {
        Titulo: "Del " + DateFormat(CS.FechaInicioPeriodo) + " al " + DateFormat(CS.FechaFinPeriodo),
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
