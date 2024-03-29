import { useEffect, useState } from 'react';
import {
  EstatusItemProps,
  EstatusItemSetProps,
} from '../../__generated__/globalTypes';
import { AxiosResponse } from 'axios';
import DataService from '../../services/data';
import GenericModActionButtons from '../GenericActionButtons';
import BodyDropdownButton from '../modal/DropdownButton';
import BodyAsignarEvaluador from './AsignarEvaluador';
import LinearProgress from '@mui/material/LinearProgress';
import { useRecoilState } from 'recoil';
import { alumnoAtom } from '../../store/slices/alumno';

const modalAsignarEvaluador = {
  label: 'Asignar evaluador',
  title: 'Asignar evaluador',
  component: <BodyAsignarEvaluador />,
};

type EstatusFetchProps = {
  loading: boolean;
  status: Array<EstatusItemProps>;
};

/**
 * Implementacion de la logica de los botones de accion del presidente
 * @returns
 */
export default function ActionButtonsPresidente() {
  const [alumno] = useRecoilState(alumnoAtom);
  const [listEstatus, setListEstatus] = useState<EstatusFetchProps>({
    loading: true,
    status: [],
  });

  /**
   * inseta el estatus de la propuesta a la base de datos
   * @param {string} statusId
   * @param {string} observaciones
   * @returns
   */
  function setEstatusAlumno(statusId: string, observaciones: string) {
    const status: EstatusItemSetProps = {
      idPropuesta: alumno.alumno.idFormulariosRespuestas,
      matricula: alumno.alumno.matricula,
      idEstatus: Number(statusId),
      observaciones: observaciones,
      isTemporal: false
    };
    return DataService.setEstatus(status);
  }

  useEffect(() => {
    DataService.getEstatus().then((response: AxiosResponse) => {
      const allEstatus = response.data;
      setListEstatus({ loading: false, status: allEstatus });
    });
  }, [setListEstatus]);

  if (listEstatus.loading) {
    return <LinearProgress />;
  }

  const modalCambiarEstatus = {
    label: 'Cambiar Estatus',
    title: 'Cambiar Estatus',
    component: (
      <BodyDropdownButton
        options={listEstatus.status}
        label="Cambiar Estatus"
        onSubmit={setEstatusAlumno}
      />
    ),
  };

  return (
    <GenericModActionButtons
      button1={modalCambiarEstatus}
      button2={modalAsignarEvaluador}
    />
  );
}
