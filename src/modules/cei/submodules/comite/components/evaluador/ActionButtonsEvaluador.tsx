import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks'
import { EstatusItemProps, EstatusItemSetProps } from '../../__generated__/globalTypes'
import {AxiosResponse} from 'axios';
import DataService from '../../services/data'
import GenericModActionButtons from '../GenericActionButtons'
import BodyDropdownButton from '../modal/DropdownButton'
import BodyRechazarEvaluacion from './RechazarEvaluacion'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


const modalRechazarEvaluacion = {
  label: 'Rechazar Evaluacion',
  title: 'Rechazar Evaluacion',
  component: <BodyRechazarEvaluacion />
}

type EstatusFetchProps = {
  loading: boolean,
  status: Array<EstatusItemProps>
}

/**
 * Implementacion de la logica de los botones de accion del evaluador
* @returns
*/
export default function ActionButtonsEvaluador() {

  const { alumno } = useAppSelector((state) => state.alumno)
  const [listEstatus, setListEstatus] = useState<EstatusFetchProps>({
    loading: true,
    status: []
  })

  useEffect(() => {
    DataService.getEstatusEvaluacion().then((response: AxiosResponse) => {
      const allEstatus = response.data;
      setListEstatus({ loading: false, status: allEstatus});
    });
  }, [setListEstatus]);

  /**
   * inseta el estatus de evaluacion a la base de datos
   * @param {string} statusId
   * @param {string} observaciones
   * @returns
   */
  function setDictamen(statusId: string, observaciones: string){
    const status: EstatusItemSetProps = {
      idPropuesta: alumno.idFormulariosRespuestas,
      matricula: alumno.matricula,
      idEstatus: Number(statusId),
      observaciones: observaciones,
    }
    return DataService.setEstatusRevision(status)
  }

  if (listEstatus.loading){
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        <LinearProgress />
      </Box>
    );
  }

  const modalAsignarDictamen = {
    label: 'Asignar estatus',
    title: 'Asignar estatus',
    component: <BodyDropdownButton options={ listEstatus.status } label="Asignar estatus" onSubmit={ setDictamen }/>
  }

  return (
    <GenericModActionButtons button1={ modalAsignarDictamen } button2={ modalRechazarEvaluacion }/>
  );
}
