import Roles from "@definitions/Roles";
import { Home, PermMedia, People, Dns, ColorLens } from "@mui/icons-material";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { CursoGql } from "@shared/types";
import { CardListItemChildrens, CardListType, FontSize } from "@shared/types/cardsTypes";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function ItemFileFunction(url:string){
  const base = "https://serviciosposgrado.ecosur.mx/profesores/Content/Cursos/Calificaciones/BoletasEstudiantesMaterias/";
  const Url = (process.env.URL_BOLETAS_ESTUDIANTES_MATERIAS || base) + url;
  return () => {window.open(Url)};
}

function RedirectFunction(url:string){
  return () => {window.location.href = url};
}

export function getDataCardCursoFinalizado(curso:CursoGql, currentRol:Roles){
  let data:CardListType = ItemsComunes(curso);
  let Calificacion:CardListItemChildrens = ItemWithChildrens("Calificación", true);
  let Enlaces:CardListItemChildrens = ItemWithChildrens("Enlaces", true);
  let Opciones:CardListItemChildrens = ItemWithChildrens("Opciones", true);
  if(currentRol === Roles.Estudiante){
    /*QUEDA PENDIENTE LA VALIDACION DE LAS CALIFICACIONES CON EL ACTA DE EVALUACION*/
    let CalificacionCurso, CalificacionSeminario;
      if(curso.BoletaCalificaciones && curso.BoletaCalificaciones[0] &&
        curso.BoletaCalificaciones[0].IDMOC == curso.IdMateriasOfertaClave &&
        curso.BoletaCalificaciones[0].NombreArchivoBoletaMateria &&
        curso.BoletaCalificaciones[0].NombreArchivoBoletaMateria != ""
      ){
        CalificacionCurso = "Asignatura: " + curso.CalificacionNumerico.toFixed(1);
        CalificacionSeminario = "Seminario: " + curso.CalificacionNumerico.toFixed(1);
      }else{
        CalificacionCurso = "Asignatura: Pendiente de calificación";
        CalificacionSeminario = "Seminario: Pendiente de calificación";
      }
    Calificacion.Childrens.push(ItemSimple(CalificacionCurso, <People />));
    if(curso.EvaluacionSeminario && curso.EvaluacionSeminario.SeminariosCatalogoEstatus.IdSeminarios_CatalogoEstatus == 4){
      Calificacion.Childrens.push(ItemSimple(CalificacionSeminario, <Dns />));
    }
    ItemCreateSubtitle(Calificacion);
    data.Items.push(Calificacion);
    
    ItemsEnlaces(curso, Enlaces);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
  }else{
    ItemsEnlacesService(curso, Enlaces);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
  }
  return data;
}

export function getDataCardCursoPendiente(curso:CursoGql, currentRol:Roles, bajaMateria:any, cambioMateria:any, idMateria:any, proceso:boolean){
  let data:CardListType = ItemsComunes(curso);
  let Opciones:CardListItemChildrens = ItemWithChildrens("Opciones", true);
  let Enlaces:CardListItemChildrens = ItemWithChildrens("Enlaces", true);
  if(currentRol === Roles.Estudiante){
    if(proceso==true){
      Opciones.Childrens.push(ItemSimple("Dar de baja", <PermMedia />, () =>{ bajaMateria(true); idMateria(curso.IdMateriasOfertaClave)}));
      Opciones.Childrens.push(ItemSimple("Sustituir", <PermMedia />, () => {cambioMateria(true); idMateria(curso.IdMateriasOfertaClave)}));
      ItemCreateSubtitle(Opciones);
      data.Items.push(Opciones);
    }
    ItemsEnlaces(curso, Enlaces);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
  }else{
    ItemsEnlacesService(curso, Enlaces);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
  }
  return data;
}

export function getDataCardCursoEnProceso(curso:CursoGql, currentRol:Roles, bajaMateria:any, cambioMateria:any, idMateria:any, proceso:boolean){
  let data:CardListType = ItemsComunes(curso);
  let Opciones:CardListItemChildrens = ItemWithChildrens("Opciones", true);
  let Enlaces:CardListItemChildrens = ItemWithChildrens("Enlaces", true);
  if(currentRol === Roles.Estudiante){
    if(proceso==true){
      Opciones.Childrens.push(ItemSimple("Dar de baja", <PermMedia />, () =>{ bajaMateria(true); idMateria(curso.IdMateriasOfertaClave)}));
      Opciones.Childrens.push(ItemSimple("Sustituir", <PermMedia />, () => {cambioMateria(true); idMateria(curso.IdMateriasOfertaClave)}));
      ItemCreateSubtitle(Opciones);
      data.Items.push(Opciones);
    }
    ItemsEnlaces(curso, Enlaces);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
  }else{
    ItemsEnlacesService(curso, Enlaces);
    if(Enlaces.Childrens.length){
      data.Items.push(Enlaces);
    }
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
        Icono: <CalendarMonthIcon />
      },
      {
        Titulo: "Unidad de impartición: " + curso.Unidad.Detalles.UnidadAdscripcion,
        FontSize: FontSize.small,
        Icono: <Home />
      }
    ]
  } as CardListType;
}
function ItemsEnlacesService(curso:CursoGql, Enlaces:CardListItemChildrens){

  if(curso.EvaluacionSeminario){
    let redireccionamiento = "seminarios_investigacion/";
    if(curso.EvaluacionSeminario.SeminariosCatalogoEstatus.IdSeminarios_CatalogoEstatus == 1){
      redireccionamiento += "evaluacion/";
    }
    redireccionamiento += curso.EvaluacionSeminario.IdSeminarios_Evaluaciones;
    let redireccionar = null;
    if(curso.EvaluacionSeminario.SeminariosCatalogoEstatus.IdSeminarios_CatalogoEstatus != 1){
      redireccionar=RedirectFunction(redireccionamiento);
    }-
    Enlaces.Childrens.push(
      ItemSimple(
        "Evaluación seminario (" + curso.EvaluacionSeminario.SeminariosCatalogoEstatus.Descripcion + ")",
        <InsertLinkIcon style={{color: 'orange'}} />,
        redireccionar, true
      )
    );
  
  }
  if(curso.EvaluacionDocentePendiente.length > 0
      && curso.EvaluacionDocentePendiente[0].MateriasSinEvaluar
      && curso.EvaluacionDocentePendiente[0].MateriasSinEvaluar.IdMateriasOfertaAnual == curso.IdMateriasOfertaAnual){
    let redireccionamiento = "evaluaciondocente/" + curso.IdMateriasOfertaAnual;
    Enlaces.Childrens.push(
      ItemSimple(
        "Evaluación docente (pendiente)",
        <InsertLinkIcon style={{color: 'orange'}} />,
        null, true
      )
    );
  }
  ItemCreateSubtitle(Enlaces);
}
function ItemsEnlaces(curso:CursoGql, Enlaces:CardListItemChildrens){
  if(curso.BoletaCalificaciones && curso.BoletaCalificaciones[0] &&
    curso.BoletaCalificaciones[0].IDMOC == curso.IdMateriasOfertaClave &&
    curso.BoletaCalificaciones[0].NombreArchivoBoletaMateria &&
    curso.BoletaCalificaciones[0].NombreArchivoBoletaMateria != ""
  ){
    Enlaces.Childrens.push(
      ItemSimple(
        "Boleta de calificaciones",
        <InsertLinkIcon style={{color: '#1ab394'}} />,
        ItemFileFunction(curso.BoletaCalificaciones[0].NombreArchivoBoletaMateria),
        
      )
    );
  }
  if(curso.EvaluacionSeminario){
    let redireccionamiento = "seminarios_investigacion/";
    if(curso.EvaluacionSeminario.SeminariosCatalogoEstatus.IdSeminarios_CatalogoEstatus == 1){
      redireccionamiento += "evaluacion/";
    }
    redireccionamiento += curso.EvaluacionSeminario.IdSeminarios_Evaluaciones;
    Enlaces.Childrens.push(
      ItemSimple(
        "Evaluación seminario (" + curso.EvaluacionSeminario.SeminariosCatalogoEstatus.Descripcion + ")",
        <InsertLinkIcon style={{color: '#1ab394'}} />,
        RedirectFunction(redireccionamiento)
      )
    );
    if(curso.EvaluacionSeminario.SeminariosCatalogoEstatus.IdSeminarios_CatalogoEstatus == 4 &&
      curso.EvaluacionSeminario.url_one_drive && curso.EvaluacionSeminario.url_one_drive != "")
    {
      Enlaces.Childrens.push(
        ItemSimple(
          "Acta de seminario",
          <InsertLinkIcon style={{color: '#1ab394'}} />,
          RedirectFunction(curso.EvaluacionSeminario.url_one_drive)
        )
      );
    }
  }
  if(curso.EvaluacionDocentePendiente.length > 0
      && curso.EvaluacionDocentePendiente[0].MateriasSinEvaluar
      && curso.EvaluacionDocentePendiente[0].MateriasSinEvaluar.IdMateriasOfertaAnual == curso.IdMateriasOfertaAnual){
    let redireccionamiento = "evaluaciondocente/" + curso.IdMateriasOfertaAnual;
    Enlaces.Childrens.push(
      ItemSimple(
        "Evaluación docente (pendiente)",
        <InsertLinkIcon style={{color: '#1ab394'}} />,
        RedirectFunction(redireccionamiento)
      )
    );
  }
  ItemCreateSubtitle(Enlaces);
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
    Warning:warning,
  } as CardListItemChildrens;
};

const ItemCreateSubtitle = (item:CardListItemChildrens) => {
  item.Childrens.forEach((element, i) => {
    item.Subtitulo += (i > 0) ? ", " : "";
    item.Subtitulo += element.Titulo.split(":")[0];
    
  });
}
