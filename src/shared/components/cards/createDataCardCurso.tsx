import { Home, PermMedia } from "@mui/icons-material";
import { CursoGql } from "@shared/types";
import { CardListType, FontSize } from "@shared/types/cardsTypes";

export function getDataCardCursoFinalizado(curso:CursoGql){
  let data:CardListType = {
    Titulo: curso.NombreMateria,
    Subtitulo: curso.Estatus,
    Items: [
      {
        Titulo: curso.ObligatoriaOptativa + " - " + curso.PeriodoNombre,
        Subtitulo: curso.ObligatoriaOptativa + " - " + curso.PeriodoNombre,
        FontSize: FontSize.small
      },
      {
        Titulo: "Del " + curso.FechaIni + " al " + curso.FechaFin,
        Subtitulo: "Del " + curso.FechaIni + " al " + curso.FechaFin,
        FontSize: FontSize.small,
        Icono: <Home />
      },
      {
        Titulo: "Opciones",
        Subtitulo: "Dar de baja materia",
        FontSize: FontSize.small,
        Childrens: [
          {
            Titulo: "Dar de baja materia",
            Subtitulo: "Dar de baja materia",
            FontSize: FontSize.small,
            Onclick: () => alert("se ha dado click"),
            Icono: <PermMedia />
          },
          {
            Titulo: "Dar de baja materia",
            Subtitulo: "Dar de baja materia",
            FontSize: FontSize.small,
            Icono: <PermMedia />
          }
        ]
      }
    ]
  }
  return data;
}

export function getDataCardCursoPendiente(curso:CursoGql){
  let data:CardListType;
  return data;
}

export function getDataCardCursoEnProceso(curso:CursoGql){
  let data:CardListType;
  return data;
}