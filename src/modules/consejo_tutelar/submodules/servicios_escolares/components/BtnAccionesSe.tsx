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
import Box from '@mui/material/Box';

function convertCT(data: Info): CT {
  const integrantesCT = data.Integrantes.map((info: Integrante) => {
    const [setEstatus] = info.EstatusIndividual.filter(
      (estatus: EstatusIndividualSE) =>
        estatus.Rol.trim() === 'Integrante de Consejo tutelar'
    );
    const date = new Date(setEstatus.Fecha);
    return {
      Id: info.IdTutorSinodal,
      Participacion: info.Participacion,
      Nombre: info.Nombre,
      Estatus: setEstatus
        ? `Aceptó el ${date.toLocaleDateString()}`
        : 'Pendiente',
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
  instructions: JSX.Element;
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
  instructions,
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
          checkedState[index] = false;
          setCheckedState(checkedState);
        }
      });

      resetAlert();
    }
  }, [alert]);

  return (
    <>
      <Button id={`${id}-btn`} size="small" onClick={handleToggleCartas}>
        {label}
      </Button>
      <EcosurFullDialog
        id={id}
        title={label}
        open={openCartas}
        handleClose={handleToggleCartas}
      >
        <Container maxWidth="sm">
          <Box sx={{ margin: '50px 0px 0px 0px' }}>
            <h3 style={{ display: 'inline' }}>INSTRUCCIONES: </h3>{' '}
            {instructions}
          </Box>
          <h3>Cartas de aceptación de integrantes</h3>
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
    async (ct: any) => {
      Swal.fire({
        target: target,
        title: 'Enviando solicitud',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(this);
        },
      });
      if (ct?.comentario) {
        await ConsejoTutelarQuerys.modificarCT(ct);
      } else {
        await ConsejoTutelarQuerys.generarCartas(ct, info.Matricula);
      }
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
          instructions={
            <>
              <label>
                Seleccione a los integrantes del consejo tutelar que debe
                generarse las cartas de aceptación y haga clic en el botón{' '}
                <b>Generar cartas</b>. Estas serán enviadas por correo
                electrónico a las personas correspondientes.{' '}
              </label>
            </>
          }
        >
          <h3>Carta de aceptación de consejo tutelar</h3>
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
          labelSubmit="Eliminar integrantes"
          instructions={
            <>
              <label>
                Seleccione a los integrantes del consejo tutelar del estudiante
                a eliminar, registre la razón y haga clic en el botón “Eliminar
                integrantes”. Se notificará al estudiante para que ingrese y
                complete su consejo tutelar.
              </label>
            </>
          }
        >
          <h3>Razón de la eliminación de integrante/s</h3>
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
