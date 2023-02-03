import { useEffect, useState } from 'react';
import {
  EvaluadorItemProps,
  AsignEvaluadorProps,
  AlertMessageProps,
} from '../../__generated__/globalTypes';
import { AxiosResponse } from 'axios';
import DataService from '../../services/data';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useRecoilState } from 'recoil';
import { alumnoAtom } from '../../store/slices/alumno';

type EvaluadorComponentProps = {
  loading: boolean;
  evaluadores: EvaluadorItemProps[];
};

// Cuerpo del dialogo para asignar evaluador
export default function BodyAsignarEvaluador() {
  const [value, setValue] = useState<EvaluadorItemProps | null>(null);
  const [alert, setAlert] = useState<AlertMessageProps | null>(null);
  const [btnState, setBtnState] = useState<boolean>(false);

  const [listEvaluador, setListEvaluador] = useState<EvaluadorComponentProps>({
    loading: true,
    evaluadores: [],
  });

  const [alumno, setAlumno] = useRecoilState(alumnoAtom);

  // Asignar evaluador a la propuesta
  function setEvaluador() {
    setBtnState(true);
    const evaluador: AsignEvaluadorProps = {
      idintegrantesComiteEtica: value ? value.id : 0,
      idEstatusRevision: 1,
      ...alumno.alumno,
    };
    DataService.setEvaluador(evaluador)
      .then(res => {
        const { data } = res;
        console.log(data);
        setAlumno(current => ({
          ...current,
          alumno: {
            ...current.alumno,
            evaluadores: [
              ...current.alumno.evaluadores,
              {
                id: data.evaluador.idPersonalAcademico,
                nombre: data.evaluador.nombre_s_ + ' ',
                estatus: 'Pendiente de revisión',
              },
            ],
          },
        }));
        setAlert({
          severity: 'success',
          message: 'El evaluador asignado con exito',
        });
      })
      .catch((e: any) => {
        setAlert({
          severity: 'warning',
          message: e.response.data,
        });
      });
    setBtnState(false);
  }

  useEffect(() => {
    DataService.getEvaluadores().then((response: AxiosResponse) => {
      const allEvaluadores: EvaluadorItemProps[] = response.data;
      setListEvaluador({ loading: false, evaluadores: allEvaluadores });
    });
  }, [setListEvaluador]);
  if (listEvaluador.loading) {
    return (
      <>
        <DialogContent>
          <DialogContentText>Cargando lista de evaluadores</DialogContentText>
        </DialogContent>
      </>
    );
  } else {
    return (
      <>
        <DialogContent>
          <DialogContentText>
            Busque al evaluador que desea asignar
          </DialogContentText>
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: EvaluadorItemProps | null) => {
              setValue(newValue);
            }}
            id="AsignarEvaluador-hi"
            options={listEvaluador.evaluadores}
            sx={{ width: 300 }}
            getOptionLabel={option => `${option.nombre}`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={params => (
              <TextField {...params} label="Buscar Evaluador" margin="normal" />
            )}
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option.nombre, inputValue);
              const parts = parse(option.nombre, matches);

              return (
                <li {...props}>
                  <div>
                    {parts.map((part, index: number) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </li>
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={setEvaluador} disabled={btnState}>
            Asignar
          </Button>
        </DialogActions>
        {alert ? (
          <Alert variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        ) : (
          <></>
        )}
      </>
    );
  }
}
