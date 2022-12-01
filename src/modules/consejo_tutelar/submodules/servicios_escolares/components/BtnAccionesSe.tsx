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
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  CT,
  Info,
  Integrante,
  EstatusIndividualSE,
  Cartas,
  ModificacionCt,
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
const estudiante = { matricula: 1234567, nombre: 'Miriam Cruz Aguilar' };

type BtnAccionesSe = {
  resetAlert: () => void;
  alert: boolean;
  matricula: number;
  label: string;
  labelSubmit: string;
  onSubmit: (ids: number[]) => void;
};
const BtnAccionesSe: FC<PropsWithChildren<BtnAccionesSe>> = ({
  resetAlert,
  alert,
  matricula,
  label,
  labelSubmit,
  onSubmit,
  children,
}) => {
  const { data, error, isLoading } = useQuery(
    ['get-ct'],
    async () => getCT(matricula),
    { select: convertCT }
  );

  const [openCartas, setOpenCartas] = useState<boolean>(false);
  const [idIntegrantes, setidIntegrantes] = useState<number[]>([]);
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(data?.Integrantes.length).fill(false)
  );

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
    setOpenCartas(false);
    resetAlert();
  }, [alert]);

  return (
    <>
      <Button size="small" onClick={handleToggleCartas}>
        {label}
      </Button>
      <EcosurFullDialog
        id={'ct-generar-cargas'}
        title="Generar Cartas"
        open={openCartas}
        handleClose={handleToggleCartas}
      >
        <Container maxWidth="sm">
          <h3>Integrantes del consejo tutelar</h3>
          {isLoading ? <CircularProgress /> : null}
          {error ? (
            <Alert severity="error">No se pudo cargar su consejo tutelar</Alert>
          ) : null}
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
  matricula: number;
  otherButttons: JSX.Element;
}

export default function Page({ matricula, otherButttons }: Props) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<string>();
  const [alert, setAlert] = useState<boolean>(false);
  const [checkedEstudiante, setCheckedEstudiante] = useState<boolean>(false);
  const handleOnChangeEstudiante = () => {
    const currentState = !checkedEstudiante;
    setCheckedEstudiante(currentState);
  };

  const { mutate } = useMutation(
    async (ct: ModificacionCt | Cartas) => {
      await ConsejoTutelarQuerys.accionesSE(ct, matricula);
    },
    {
      onSuccess: () => {
        Swal.fire({
          customClass: {
            container: 'sweetAlert2-container',
          },
          icon: 'success',
          title: 'El consejo tutelar',
          text: 'Se guardó exitosamente',
          allowOutsideClick: false,
        }).then(result => {
          if (result.isConfirmed) {
            setAlert(true);
          }
        });
      },
      onError: () => {
        Swal.fire({
          customClass: {
            container: 'sweetAlert2-container',
          },
          icon: 'error',
          title: 'Error',
          text: 'No se guardó su consejo tutelar, verifique la información registrada e intentelo nuevamente.',
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
    const cartas: Cartas = {
      estudiante: checkedEstudiante,
      integrantes: ids,
    };
    // console.log(cartas);
    mutate(cartas);
  };

  const handleOnSubmitModificarCt = (ids: number[]) => {
    const modificacion: ModificacionCt = {
      integrantes: ids,
      comentario: comment,
    };
    // console.log(modificacion);
    mutate(modificacion);
  };

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="Disabled elevation buttons">
        {otherButttons}
        <BtnAccionesSe
          onSubmit={handleOnSubmitCartas}
          resetAlert={() => {
            setAlert(false);
          }}
          alert={alert}
          matricula={matricula}
          label="Generar Cartas"
          labelSubmit="Generar cartas"
        >
          <h3>Alumno</h3>
          <FormControlLabel
            key={`ct-integrantes-${estudiante.matricula}`}
            checked={checkedEstudiante}
            onChange={handleOnChangeEstudiante}
            control={<Checkbox />}
            label={estudiante.nombre}
          />
        </BtnAccionesSe>
        <BtnAccionesSe
          onSubmit={handleOnSubmitModificarCt}
          resetAlert={() => {
            setAlert(false);
          }}
          alert={alert}
          matricula={matricula}
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
