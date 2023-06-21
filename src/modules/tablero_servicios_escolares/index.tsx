import CardGestion from "./Cards/cardGestion";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import GavelIcon from '@mui/icons-material/Gavel';
import GroupIcon from '@mui/icons-material/Group';
import { HeaderSection } from "@shared/components";
const TableroServiciosEscolares =()=>{
     return (
        <>
      
    <div style={{display: "flex", justifyContent:"space-around", marginBottom:40}}>
      <CardGestion
        icon={<AccountBalanceIcon style={{ fontSize: 35 }}/>}
        title="Consejo Tutelar"
        details="Seguimiento del proceso de conformación del consejo tutelar de estudiantes"
        link="/consejo_tutelar"
      />
      <CardGestion
       icon={<PlaylistAddCheckIcon style={{ fontSize: 35 }}/>}
        title="Inscripciones"
        details="Seguimiento de la Inscripción de los estuduaintes a los periodos"
        link="/inscripciones"
      />
    </div>
    <div style={{display: "flex", justifyContent:"space-around", marginBottom:40}}>
      <CardGestion
        icon={<SchoolIcon style={{ fontSize: 35 }} />}
        title="Asignaturas"
        details="Seguimiento de las asignaturas, profesores, evaluación de seminario, evaluación docente, calificaciones, altas y bajas "
        link="/gestionAsignaturas"
      />
      <CardGestion
       icon={<GroupIcon style={{ fontSize: 35 }} />}
        title="Estudiantes"
        details="Seguimiento de estudiantes activos, egresados, graduados, bajas"
        link="/estudiantes"
      />
    </div>
    <div style={{display: "flex", justifyContent:"space-around", marginBottom:40}}>
      <CardGestion
        icon={<BadgeIcon style={{ fontSize: 35 }} />}
        title="Títulos"
        details="Gestión para el tramite de cédulas electrónicas de los estudiantes graduados"
        link="https://serviciosposgrado.ecosur.mx/general/generaciontitulosxml/gestion"
      />
      <CardGestion
        icon={<GavelIcon style={{ fontSize: 35 }} />}
        title="Evaluación ética de la investigación"
        details=" "
        link="/cei"
      />
      
    </div>
        </>
     )
}

export default TableroServiciosEscolares;