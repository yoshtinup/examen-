import { useState, FC, PropsWithChildren } from 'react';
import {
  Container,
  Button,
  FormGroup,
  FormControlLabel,
  ButtonGroup,
  Checkbox,
} from '@mui/material';
import { EcosurFullDialog } from 'ecosur-ui';

const consejoTutelar = [
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
];
const estudiante = { matricula: 1234567, nombre: 'Miriam Cruz Aguilar' };
type BtnAccionesSe = {
  label: string;
  labelSubmit: string;
  onSubmit: (ids: number[]) => void;
};
const BtnAccionesSe: FC<PropsWithChildren<BtnAccionesSe>> = ({
  label,
  labelSubmit,
  onSubmit,
  children,
}) => {
  const [openCartas, setOpenCartas] = useState<boolean>(false);
  const [idIntegrantes, setidIntegrantes] = useState<number[]>([]);
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(consejoTutelar.length).fill(false)
  );
  const handleOnChangeCT = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const ids: number[] = consejoTutelar
      .filter((_, index) => updatedCheckedState[index] === true)
      .map(integrante => integrante.id);
    setidIntegrantes(ids);
  };

  const handleOnClick = () => {
    onSubmit(idIntegrantes);
  };
  const handleToggleCartas = () => setOpenCartas(!openCartas);
  return (
    <>
      <Button onClick={handleToggleCartas}>{label}</Button>
      <EcosurFullDialog
        id={'ct-generar-cargas'}
        title="Generar Cartas"
        open={openCartas}
        handleClose={handleToggleCartas}
      >
        <Container maxWidth="sm">
          <h3>Integrantes del consejo tutelar</h3>
          <FormGroup>
            {consejoTutelar.map(
              ({ id, nombre, status, participacion }, index) => (
                <FormControlLabel
                  key={`ct-integrantes-${id}-${index}`}
                  checked={checkedState[index]}
                  onChange={() => handleOnChangeCT(index)}
                  control={<Checkbox />}
                  label={`${nombre}(${participacion}, ${status})`}
                />
              )
            )}
            {children}
          </FormGroup>
          <Button onClick={handleOnClick}>{labelSubmit}</Button>
        </Container>
      </EcosurFullDialog>
    </>
  );
};

type Cartas = {
  matricula: number;
  integrantes: number[];
};

type ModificacionCt = {
  integrantes: number[];
  comentario: string;
};

export default function Page() {
  const [checkedEstudiante, setCheckedEstudiante] = useState<boolean>(false);
  const [matricula, setMatricula] = useState<number>(0);
  const handleOnChangeEstudiante = () => {
    const currentState = !checkedEstudiante;
    setCheckedEstudiante(currentState);
    if (currentState) {
      setMatricula(estudiante.matricula);
      return;
    }
    setMatricula(0);
  };
  const handleOnSubmitCartas = (ids: number[]) => {
    const cartas: Cartas = {
      matricula: matricula,
      integrantes: ids,
    };
    console.log(cartas);
  };

  const handleOnSubmitModificarCt = (ids: number[]) => {
    const modificacion: ModificacionCt = {
      integrantes: ids,
      comentario: 'hola mundo',
    };
    console.log(modificacion);
  };

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="Disabled elevation buttons">
        <BtnAccionesSe
          onSubmit={handleOnSubmitCartas}
          label="Gerarar Cartas"
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
          label="Modificar consejo tutelar"
          labelSubmit="Borrar integrantes"
        >
          <h1>Incluir comentario!!</h1>
        </BtnAccionesSe>
      </ButtonGroup>
    </div>
  );
}
