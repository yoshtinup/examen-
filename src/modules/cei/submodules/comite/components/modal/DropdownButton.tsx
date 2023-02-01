import * as React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormLabel from '@mui/material/FormLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { EstatusItemProps, AlertMessageProps } from '../../__generated__/globalTypes'
import { useAppDispatch } from '../../hooks'
import { setEstatus } from '../../store/slices/alumno'


interface DropDownOption {
  options: Array<EstatusItemProps>,
  label: string,
  onSubmit(optionValue: string, sugerencia: string): any
}

/**
 * Cuerpo del dialogo para ActionButtons que requieran DropDown
 * @param
 * @returns
 */
const BodyDropdownButton: React.FC<DropDownOption> = ({options, label, onSubmit}) => {
  const [alert, setAlert] = React.useState<AlertMessageProps | null>(null);
  const [currentOption, setCurrentOption] = React.useState('');
  const [sugerencia, setSugerencia] = React.useState('');
	const dispatch = useAppDispatch()

  const handleChange = (event: SelectChangeEvent<typeof currentOption>) => {
    setCurrentOption(event.target.value as string);
  }

  const handleChangeSugerencia = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSugerencia(event.target.value as string);
  }

  const generateDropdownOptions = () => {
    return options.map((option, index) => (
      <MenuItem key = {`${option.id}-${index}`} value={option.id}>{option.descripcion}</MenuItem>
    ));
  };

  // llama a la funcion que asigna un estatus
  function handleAction(){
    onSubmit(currentOption, sugerencia)
      .then((response: any) => {
				dispatch(setEstatus(response.data.estatus))
        setAlert({
          severity: "success",
          message: "El estatus asignado con exito"
        })
      })
      .catch(() => {
        setAlert({
          severity: "warning",
          message: "El estatus no pudo asignarse"
        })
      });
  }

  return (
      <>
        <DialogContent>
          <DialogContentText>
            Selecciona el estatus
          </DialogContentText>
            <FormControl sx={{ m: 1, width: '100%' }}>
              <InputLabel id="dialog-select-label">{label}</InputLabel>
              <Select
                labelId="dialog-select-label"
                id="dialog-select"
                value={currentOption}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
              >
                {generateDropdownOptions()}
              </Select>
              <FormLabel component="legend">Sugerencia</FormLabel>
                <Alert severity="warning">Si usted no cuenta con sugerencias, favor de dejar vacía la caja de texto. <br></br>Si usted ya ha agregado una sugerencia se reemplazara por el texto de la nueva sugerencia.</Alert>
                <TextareaAutosize
                  aria-label="sugerencia"
                  minRows={3}
                  placeholder="Agregar sugerencia"
                  onChange={handleChangeSugerencia}
                />
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAction} autoFocus>
           Guardar
          </Button>
        </DialogActions>
        {alert ? <Alert variant="filled" severity={alert.severity}>{alert.message}</Alert> : <></> }
    </>
  );
}
export default BodyDropdownButton
