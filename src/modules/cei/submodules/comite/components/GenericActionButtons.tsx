import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CustomDialog from './modal/CustomDialog';
import { useRouter } from 'next/router';
import DataService from '../services/data';
import { useRecoilState } from 'recoil';
import { alumnoAtom } from '../store/slices/alumno';
import { evaluacionAtom } from '../store/slices/evaluacion';

type ActionButtonProps = {
  // etiqueta del boton
  label: string;
  // Titulo del dialogo principal
  title: string;
  // Fragmento complementario para el componente dialogo
  disabled?: boolean;
  component: any;
};

type ActionButtonsProps = {
  button1: ActionButtonProps;
  button2: ActionButtonProps;
};

/**
 * Componente generico de botones de accion
 * para evaludores y el presidente
 * solo contine la estructura que se integra
 * con los componentes pasados por cada boton
 * @return
 */
const GenericModActionButtons: React.FC<ActionButtonsProps> = ({
  button1,
  button2,
}) => {
  // Manejo del estado para la apertura de los dialogos de confirmacion para el
  // boton 1
  const [openMod1, setOpenMod1] = React.useState(false);
  const [alumno] = useRecoilState(alumnoAtom);
  const [_, setEvaluacion] = useRecoilState(evaluacionAtom);
  const handleOpenMod1 = () => {
    setOpenMod1(true);

    DataService.getEvaluacionTemporal(
      alumno.alumno.idFormulariosRespuestas
    ).then(response => {
      if (response.status == 200) {
        setEvaluacion({
          idEstatus: response.data.idEstatus,
          observaciones: response.data.observaciones,
        });
      }

      if (response.status == 204) {
        console.log('reset');
      }
    });
  };
  const handleCloseMod1 = () => setOpenMod1(false);

  // Manejo del estado para la apertura de los dialogos de confirmacion para el
  // boton 2
  const [openMod2, setOpenMod2] = React.useState(false);
  const handleOpenMod2 = () => setOpenMod2(true);
  const handleCloseMod2 = () => setOpenMod2(false);

  const router = useRouter();
  return (
    <div>
      <ButtonGroup disableElevation variant="contained">
        <Button disabled={button2.disabled ?? false} onClick={handleOpenMod1}>
          {button1.label}
        </Button>
        <Button
          disabled={button2.disabled ?? false}
          variant="contained"
          color="success"
          onClick={handleOpenMod2}
        >
          {button2.label}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => router.push('/cei')}
        >
          Regresar
        </Button>
      </ButtonGroup>
      <CustomDialog
        title={button1.title}
        open={openMod1}
        onClose={handleCloseMod1}
      >
        {button1.component}
      </CustomDialog>
      <CustomDialog
        title={button2.title}
        open={openMod2}
        onClose={handleCloseMod2}
      >
        {button2.component}
      </CustomDialog>
    </div>
  );
};
export default GenericModActionButtons;
