import React, { useState, FC, PropsWithChildren } from 'react';
import {
  Alert,
  CircularProgress,
  Container,
  Button,
  FormGroup,
  FormControlLabel,
  ButtonGroup,
  Checkbox,
  TextField,
} from '@mui/material';
import { EcosurFullDialog } from 'ecosur-ui';
import { getCT } from '../queries';
import { useQuery, useMutation } from 'react-query';
import {
  CT,
  Info,
  Integrante,
  EstatusIndividualSE,
  Cartas,
  ModificacionCt,
  EnProceso,
} from '../types';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import Swal from 'sweetalert2';

/* const consejoTutelar = [
  {
    id: 1,
    nombre: 'Diego Cruz Aguilar',
    participacion: 'Asesor',
    status: 'Acepto',
  },
  {
    id: 2,
    nombre: 'Marla Cruz Aguilar',
    participacion: 'Codirector',
    status: 'Pendiente',
  },
]; */
//const estudiante = { matricula: 1234567, nombre: 'Miriam Cruz Aguilar' };

function convertCT(data: Info): CT {
  const integrantesCT = data.Integrantes.map((info: Integrante) => {
    const [setEstatus] = info.EstatusIndividual.filter(
      (estatus: EstatusIndividualSE) =>
        estatus.Rol.trim() === 'Integrante de Consejo tutelar'
    );
    return {
      Id: info.IdTutorSinodal,
      Participacion: info.Participacion,
      Nombre: info.Nombre,
      Estatus: setEstatus ? `Aceptó el ${setEstatus.Fecha}` : 'Pendiente',
    };
  });

  return {
    Integrantes: integrantesCT,
  };
}

type BtnAccionesSe = {
  resetAlert: () => void;
  alert: boolean;
  data: CT;
  label: string;
  labelSubmit: string;
  onSubmit: (ids: number[]) => void;
  id: string;
};

const BtnAccionesSe: FC<PropsWithChildren<BtnAccionesSe>> = ({
  resetAlert,
  alert,
  data,
  label,
  labelSubmit,
  onSubmit,
  children,
  id,
}) => {
  const [openCartas, setOpenCartas] = useState<boolean>(false);
  const [idIntegrantes, setidIntegrantes] = useState<number[]>([]);
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(data?.Integrantes.length).fill(false)
  );

  const handleOnChangeCT = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const ids: number[] = data.Integrantes.filter(
      (_, index) => updatedCheckedState[index] === true
    ).map(integrante => integrante.Id);
    setidIntegrantes(ids);
  };

  const handleOnClick = () => {
    onSubmit(idIntegrantes);
  };
  const handleToggleCartas = () => setOpenCartas(!openCartas);

  React.useEffect(() => {
    if (alert) {
      setOpenCartas(false);
      setidIntegrantes([]);
      checkedState.forEach((state, index) => {
        if (state) {
          console.log('checkedState');
          console.log(checkedState);
          checkedState[index] = false;
          console.log(checkedState);
          setCheckedState(checkedState);
        }
      });

      resetAlert();
      console.log('RESET ALL');
    }
  }, [alert]);

  return (
    <>
      <Button id={`${id}-btn`} size="small" onClick={handleToggleCartas}>
        {label}
      </Button>
      <EcosurFullDialog
        id={id}
        title="Generar Cartas"
        open={openCartas}
        handleClose={handleToggleCartas}
      >
        <Container maxWidth="sm">
          <h3>Integrantes del consejo tutelar</h3>
          {data ? (
            <>
              <FormGroup>
                {data.Integrantes.map(
                  ({ Id, Nombre, Estatus, Participacion }, index) => (
                    <FormControlLabel
                      key={`ct-integrantes-${Id}-${index}`}
                      checked={checkedState[index]}
                      onChange={() => handleOnChangeCT(index)}
                      control={<Checkbox />}
                      label={`${Nombre} (${Participacion}, ${Estatus})`}
                    />
                  )
                )}
                {children}
              </FormGroup>
              <Button onClick={handleOnClick}>{labelSubmit}</Button>
            </>
          ) : null}
        </Container>
      </EcosurFullDialog>
    </>
  );
};

interface Props {
  info: EnProceso;
  otherButttons: JSX.Element;
}

const idDialogCartas = 'ct-generar-cargas-cartas';
const idDialogModificacionCT = 'ct-generar-cargas-modificacion';
let target: HTMLElement;

export default function Page({ info, otherButttons }: Props) {
  const [comment, setComment] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [checkedEstudiante, setCheckedEstudiante] = useState<boolean>(false);
  const handleOnChangeEstudiante = () => {
    const currentState = !checkedEstudiante;
    setCheckedEstudiante(currentState);
  };

  const reset = () => {
    setComment('');
    setCheckedEstudiante(false);
  };

  const { mutate } = useMutation(
    async (ct: ModificacionCt | Cartas) => {
      Swal.fire({
        target: target,
        title: 'Enviando solicitud',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(this);
        },
      });
      await ConsejoTutelarQuerys.accionesSE(ct, info.Matricula);
    },
    {
      onSuccess: () => {
        Swal.fire({
          target: target,
          icon: 'success',
          title: '¡Éxito!',
          text: 'Procesando su solicitud...',
          allowOutsideClick: false,
        }).then(result => {
          if (result.isConfirmed) {
            setAlert(true);
            reset();
          }
        });
      },
      onError: () => {
        Swal.fire({
          target: target,
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al procesar tu solicitud, inténtelo nuevamente.',
          allowOutsideClick: false,
        }).then(result => {
          if (result.isConfirmed) {
            setAlert(true);
          }
        });
      },
    }
  );

  const handleOnSubmitCartas = (ids: number[]) => {
    target = document.getElementById(idDialogCartas);
    console.log(ids, checkedEstudiante);
    if (checkedEstudiante || ids.length > 0) {
      const cartas: Cartas = {
        estudiante: checkedEstudiante,
        integrantes: ids,
      };
      mutate(cartas);
      return;
    }

    Swal.fire({
      target: target,
      icon: 'info',
      title: '¡Atención',
      text: 'Debes seleccionar al menos un dato',
      allowOutsideClick: false,
    });
  };

  const handleOnSubmitModificarCt = (ids: number[]) => {
    target = document.getElementById(idDialogModificacionCT);
    console.log(ids, comment);
    if (ids.length > 0 && comment) {
      const modificacion: ModificacionCt = {
        integrantes: ids,
        comentario: comment,
      };
      mutate(modificacion);
      return;
    }

    Swal.fire({
      target: target,
      icon: 'info',
      title: '¡Atención!',
      text: 'Debes seleccionar al menos un integrante y escribir un comentario',
      allowOutsideClick: false,
    });
  };

  const { data, error, isLoading } = useQuery(
    ['get-ct'],
    async () => getCT(info.Matricula),
    { select: convertCT }
  );

  if (isLoading) return <CircularProgress />;

  if (error)
    return <Alert severity="error">No se pudo cargar su consejo tutelar</Alert>;

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="Disabled elevation buttons">
        {otherButttons}
        <BtnAccionesSe
          id={idDialogCartas}
          onSubmit={handleOnSubmitCartas}
          resetAlert={() => {
            setAlert(false);
          }}
          alert={alert}
          data={data}
          label="Generar Cartas"
          labelSubmit="Generar cartas"
        >
          <h3>Alumno</h3>
          <FormControlLabel
            key={`ct-integrantes-${info.Matricula}`}
            checked={checkedEstudiante}
            onChange={handleOnChangeEstudiante}
            control={<Checkbox />}
            label={`${info.Alumno.Datos.Nombre} ${info.Alumno.Datos.ApellidoPaterno} ${info.Alumno.Datos.ApellidoMaterno}`}
          />
        </BtnAccionesSe>
        <BtnAccionesSe
          id={idDialogModificacionCT}
          onSubmit={handleOnSubmitModificarCt}
          resetAlert={() => {
            setAlert(false);
          }}
          alert={alert}
          data={data}
          label="Modificar consejo tutelar"
          labelSubmit="Borrar integrantes"
        >
          <h3>Justificación del cambio</h3>
          <TextField
            multiline
            rows={10}
            style={{ margin: '0px 0px 10px 0px' }}
            onChange={e => {
              setComment(e.currentTarget.value);
            }}
          ></TextField>
        </BtnAccionesSe>
      </ButtonGroup>
    </div>
  );
}
