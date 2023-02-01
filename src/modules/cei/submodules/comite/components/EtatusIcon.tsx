import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';

/**
 * Coponente que contine una coleccion de estatus
 * del evaluador que ayudan con la seleccion del
 * icono correcto
 * @param {status}
 * @returns
 */
const StatusIcon = ({status}: {status: string}) =>{
  const statuses = {
    "Pendiente de revisión": () => (<RunningWithErrorsIcon color="disabled" />),
    "Aprobado": () => (<CheckCircleOutlineIcon color="success" />),
    "No aprobado": () => (<CancelOutlinedIcon color="secondary" />),
    "Rechazado": () => (<DoNotDisturbAltOutlinedIcon color="error" />)
  }
  const Icons = statuses[status]
  return (
    <Icons />
  )
}
export default StatusIcon
