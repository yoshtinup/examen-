import Roles from "@definitions/Roles";
import { Home, People, Dns } from "@mui/icons-material";
import { Estatus } from "@shared/types";
import { CardListItemChildrens, CardListType, FontSize } from "@shared/types/cardsTypes";
import { CSGql } from "@shared/types/cuatrimestresSemestresGql";

function ItemFileFunction(url:string){
  const Url = process.env.URL_BOLETAS_INSCRIPCIONES + url;
  return () => {window.open(Url)};
}

export function getDataCardCSFinalizado(CS:CSGql, currentRol:Roles){
  let data:CardListType = ItemsComunes(CS);
  let Enlaces:CardListItemChildrens = ItemWithChildrens("Enlaces", true);
  let Cursos:CardListItemChildrens = ItemWithChildrens("Asignaturas", true);
  if(currentRol === Roles.Estudiante){
    let Calificacion:CardListItemChildrens = ItemWithChildrens("Calificación", true);
    if(CS.Calificacion){
      let nota = CS.CalificacionPendiente ? " *"/*" - ¡¡¡ calificaciones pendientes !!!"*/ : "";
      Calificacion.Childrens.push(ItemSimple("Global: " + CS.Calificacion.toFixed(2) + nota, <People />));
    }else{
      Calificacion.Childrens.push(ItemSimple("Pendiente de calificación", <People />));
    }
    ItemCreateSubtitle(Calificacion);
    data.Items.push(Calificacion);

    ItemsEnlacesCursos(CS, Enlaces, Cursos, null,currentRol);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
    if(Cursos.Childrens.length){
      data.Items.push(Cursos);
    }
  }
  else{
    ItemsInscripcionService(CS, Enlaces, Cursos, null, currentRol);
    
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
    if(Cursos.Childrens.length){
      data.Items.push(Cursos);
    }
  }
  
  return data;
}

export function getDataCardCSPendiente(CS:CSGql, currentRol:Roles, Inscribirse:any){
  let data:CardListType = ItemsComunes(CS);
  let Enlaces:CardListItemChildrens = ItemWithChildrens("Enlaces", true);
  let Cursos:CardListItemChildrens = ItemWithChildrens("Asignaturas", true);
  if(currentRol === Roles.Estudiante){
    ItemsEnlacesCursos(CS, Enlaces, Cursos, () => Inscribirse(data), currentRol);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
    if(Cursos.Childrens.length){
      data.Items.push(Cursos);
    }
  }else{
    ItemsInscripcionService(CS, Enlaces, Cursos, null, currentRol);
    
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
    if(Cursos.Childrens.length){
      data.Items.push(Cursos);
    }
  }
  return data;
}

export function getDataCardCSEnProceso(CS:CSGql, currentRol:Roles, Inscribirse:any){
  const idBoletasIncripciones = CS.BoletaInscripcion?.IdBoletasIncripciones;
  let data:CardListType = ItemsComunes(CS);
  let Enlaces:CardListItemChildrens = ItemWithChildrens("Enlaces", true);
  let Cursos:CardListItemChildrens = ItemWithChildrens("Asignaturas", true);
  if(currentRol === Roles.Estudiante){
    ItemsEnlacesCursos(CS, Enlaces, Cursos, () => Inscribirse(idBoletasIncripciones), currentRol);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
    if(Cursos.Childrens.length){
      data.Items.push(Cursos);
    }
  }else{
    
    ItemsInscripcionService(CS, Enlaces, Cursos, null, currentRol);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
    if(Cursos.Childrens.length){
      data.Items.push(Cursos);
    }
  }
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
function ItemsInscripcionService(CS:CSGql, Enlaces:CardListItemChildrens, Cursos:CardListItemChildrens, Inscribirse:any, currentRol:Roles){
  let debeInscribirse:Boolean = false;
  let x:number;
  console.log(CS)
  for(x=0; x<CS.Cursos.length; x+=1){
    if(CS.Cursos[x].BoletaInscripcion && CS.Cursos[x].BoletaInscripcion.IdCatalogoEstatusInscripciones==1){
      debeInscribirse = true;
      break;
    }else if(CS.Cursos[x].BoletaInscripcion && CS.Cursos[x].BoletaInscripcion.url){
      console.log('paso')
       Enlaces.Childrens.push(ItemSimple("Boleta de inscripción", <People />, ItemFileFunction(CS.Cursos[x].BoletaInscripcion.url)));
      break;
    }
  }
  if(CS.Estatus!=Estatus.Finalizado && debeInscribirse){ 
    Enlaces.Childrens.push(ItemSimple("Pendiente de inscribirse", <People style={{color:'orange'}} />,null, true));
  }
  ItemCreateSubtitle(Enlaces);
  for(x=0; x<CS.Cursos.length; x+=1){
    Cursos.Childrens.push(ItemSimple(CS.Cursos[x].NombreMateria + " (Del " + DateFormat(CS.Cursos[x].FechaIni) + " al " + DateFormat(CS.Cursos[x].FechaFin) + ")", <Dns />));
  }
  ItemCreateSubtitle(Cursos);
}

function ItemsEnlacesCursos(CS:CSGql, Enlaces:CardListItemChildrens, Cursos:CardListItemChildrens, Inscribirse:any, currentRol:Roles){
  let debeInscribirse:Boolean = false;
  let x:number;
  for(x=0; x<CS.Cursos.length; x+=1){
    if(CS.Cursos[x].BoletaInscripcion && CS.Cursos[x].BoletaInscripcion.IdCatalogoEstatusInscripciones==1){
      debeInscribirse = true;
      break;
    }else if(CS.Cursos[x].BoletaInscripcion && CS.Cursos[x].BoletaInscripcion.url){
      Enlaces.Childrens.push(ItemSimple("Boleta de inscripción", <People />, ItemFileFunction(CS.Cursos[x].BoletaInscripcion.url)));
      break;
    }
  }
  if(CS.Estatus!=Estatus.Finalizado && debeInscribirse){ 
    Enlaces.Childrens.push(ItemSimple("Inscribirse", <People />, Inscribirse));
  }
  ItemCreateSubtitle(Enlaces);
  
  for(x=0; x<CS.Cursos.length; x+=1){
    Cursos.Childrens.push(ItemSimple(CS.Cursos[x].NombreMateria + " (Del " + DateFormat(CS.Cursos[x].FechaIni) + " al " + DateFormat(CS.Cursos[x].FechaFin) + ")", <Dns />));
  }
  ItemCreateSubtitle(Cursos);
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

const ItemSimple = (titulo:string, icono:React.ReactNode, Onclick?:any, warning?:boolean) => {
  return {
    Titulo: titulo,
    FontSize: FontSize.small,
    Icono: icono,
    Onclick: Onclick,
    Warning: warning ,
  } as CardListItemChildrens;
};

const ItemCreateSubtitle = (item:CardListItemChildrens) => {
  item.Childrens.forEach((element, i) => {
    item.Subtitulo += (i > 0) ? ", " : "";
    item.Subtitulo += element.Titulo.split(":")[0];
  });
}
