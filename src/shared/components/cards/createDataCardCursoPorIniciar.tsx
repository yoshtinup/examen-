import Roles from "@definitions/Roles";
import { Home } from "@mui/icons-material";
import { CardListType, FontSize } from "@shared/types/cardsTypes";
import { CursoPorIniciarGql } from "@shared/types/cursosPorIniciarGql";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import { User } from "@public/icons/user";
import { date, number } from "yup";
import { format } from 'date-fns';

export function getDataCardCursoAIniciar(curso:CursoPorIniciarGql, currentRol:Roles, agregarPlan, idMateria, show:boolean){

  const fecha = new Date(curso.fechaLimiteAltaACurso)
  
  return {
   
    Titulo: curso.NombreMateria,
    Subtitulo: "Clave: " + curso.Clave + ', Creditos: ' + curso.Creditos,
    Items: [
      {
        Titulo: "Del " + DateFormat(curso.FechaInicioCurso) + " al " + DateFormat(curso.FechaFinCurso),
        FontSize: FontSize.small,
        Icono: <CalendarMonthIcon />
      },
      {
        Titulo: 'Fecha límite para darse alta ' + format(fecha, 'dd/MM/yyyy'),
        FontSize: FontSize.small,
        Important: true,
        Icono: <ScheduleIcon style={{color: "#c56b16", fontSize: '25px'}} />
      },
      {
        Titulo: "Docente: " + curso.Profesor_responsable,
        FontSize: FontSize.small,
        Icono: <PersonIcon />
      },
      {
        Titulo: "Grado del programa: " + curso.GradoDeCurso,
        FontSize: FontSize.small,
        Icono: <SchoolIcon />
      },
      {
        Titulo: "Unidad: " + curso.SedeDeCurso,
        FontSize: FontSize.small,
        Icono: <Home />
      },
      {
        Titulo: show ? "Agregar a plan de estudios":'',
        FontSize: FontSize.small,
        Warning:true,
        Icono: show ? <InsertLinkIcon style={{color: '#1ab394'}}/>: '',
        
      },
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
