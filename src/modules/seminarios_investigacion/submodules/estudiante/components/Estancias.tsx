import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  FormControl,
  Button,
  InputLabel,
  Input,
  TextField,
  Select,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import Switch from './Switch';
import { texto, notificaciones } from './TextoInterfaces';
import { formCompleto, rangoFechasValido } from './funcionesGeneral';
import Table from './TableEstancias';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { actividadesState } from 'pages/seminarios_investigacion/store/actividadesState';
import { DatosEstancia } from '../types';
import axios from 'axios'
/*import {
  agregarEstancia,
  handleSinEstancia,
} from 'actions/seminario-investigacion';
*/

export default props => {
  const setEstanciaState = useSetRecoilState(actividadesState)


  const [validForm, setValidForm] = useState(false);
  const [fechaFinCorrecta, setFechaFinCorrecta] = useState(false);
  const [estancia, setEstancia] = useState({
    id: 0,
    key: 0,
    universidadCentro: '',
    areaDeAdscripcion: '',
    fechaInicio: new Date(),
    fechaConclusion: new Date(),
    ambito: '',
  });

  const resetEstancia = {
    id: 0,
    key: 0,
    universidadCentro: '',
    areaDeAdscripcion: '',
    fechaInicio: new Date(),
    fechaConclusion: new Date(),
    ambito: '',
  };

  const TextPopover = () => (
    <>
      <Typography variant="inherit" className="text-navy">
        <b>¿Esta seguro/a de que no registrará estancias?</b>
      </Typography>
      <br />
      <Typography variant="inherit">
        ¡Se eliminarán las estancias previamente registradas!
      </Typography>
    </>
  );
  /*
  const CustomSwith = () => {
    if (props.datosEstancias && props.datosEstancias.length > 0) {
      return (
        <Popconfirm
          title={<TextPopover />}
          cancelText="Cancelar"
          okText="Aceptar"
          icon={<QuestionCircleOutlined twoToneColor="#B00000" />}
          onConfirm={() => dispatch(handleSinEstancia())}
        >
          <Switch checked={!props.tieneEstancias} />
        </Popconfirm>
      );
    }
    return (
      <Switch
        checked={!props.tieneEstancias}
        onChange={() => dispatch(handleSinEstancia())}
      />
    );
  };*/

  const handleChange = evt => {
    const { target } = evt;
    setEstancia({
      ...estancia,
      [target.name]: target.value,
    });
  };

  const handleFechaInicio = fecha => {
    setEstancia({
      ...estancia,
      fechaInicio: fecha,
    });
    const rangoFechasValidas = rangoFechasValido(
      fecha,
      estancia.fechaConclusion
    );
    if (!rangoFechasValidas) {
      notificaciones.fechaConclusionIncorrecta();
    }
    setFechaFinCorrecta(rangoFechasValidas);
  };

  const handleFechaConclusion = fecha => {
    setEstancia({
      ...estancia,
      fechaConclusion: fecha,
    });
    const rangoFechasValidas = rangoFechasValido(estancia.fechaInicio, fecha);
    if (!rangoFechasValidas) {
      notificaciones.fechaConclusionIncorrecta();
    }
    setFechaFinCorrecta(rangoFechasValidas);
  };
  const addEstanciaState = (estanciaDado: DatosEstancia) =>{
    setEstanciaState( actividadesState => ({
      ...actividadesState,
      datosEstancias: [
        ...actividadesState.datosEstancias, estanciaDado
      ]
    }))
  }

  const addEstancia = () => {
    const idRandom = Math.random()*100;
    const updatedEstancia = Object.assign({}, estancia, {
      ...estancia,
      fechaInicio: moment(estancia.fechaInicio).format('DD/MM/yyyy'),
      fechaConclusion: moment(estancia.fechaConclusion).format('DD/MM/yyyy'),
      id: 0,
      key: idRandom,
    });
    addEstanciaState(updatedEstancia)
    //dispatch(agregarEstancia(updatedEstancia));
  };

  const formValid = estancia => {
    const datosLlenos = formCompleto(estancia);
    const rangoFechasValidas = rangoFechasValido(
      estancia.fechaInicio,
      estancia.fechaConclusion
    );
    setValidForm(datosLlenos && rangoFechasValidas);
  };

  const Indicator = () => <p />;

  useEffect(() => {
    formValid(estancia);
  }, [estancia]);

  return (
    <Box>
      <Grid container spacing={3}>
        {props.estatus === 1 && (
          <>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<CustomSwith />}
                label="No realicé estancias"
                style={{ color: '#000', fontWeight: 'bolder' }}
              /> */}
            </Grid>

            <Grid container spacing={3} className="mr-3">
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="universidadCentro">
                    {texto.tabs.tabEstancias.form.universidadCentro.label}
                  </InputLabel>
                  <Input
                    id="universidadCentro"
                    name="universidadCentro"
                    type="text"
                    value={estancia.universidadCentro}
                    onChange={handleChange}
                    placeholder={
                      texto.tabs.tabEstancias.form.universidadCentro.placeholder
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="areaDeAdscripcion">
                    {texto.tabs.tabEstancias.form.areaDeAdscripcion.label}
                  </InputLabel>
                  <Input
                    id="areaDeAdscripcion"
                    name="areaDeAdscripcion"
                    type="text"
                    value={estancia.areaDeAdscripcion}
                    onChange={handleChange}
                    placeholder={
                      texto.tabs.tabEstancias.form.areaDeAdscripcion.placeholder
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={estancia.fechaInicio}
                      label={texto.tabs.tabEstancias.form.fechaInicio.label}
                      onChange={fecha => handleFechaInicio(fecha)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={estancia.fechaConclusion}
                      label={texto.tabs.tabEstancias.form.fechaConclusion.label}
                      onChange={fecha => handleFechaConclusion(fecha)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="ambito">
                    {texto.tabs.tabEstancias.form.ambito.label}
                  </InputLabel>
                  <Select
                    native
                    id="ambito"
                    value={estancia.ambito}
                    onChange={handleChange}
                    inputProps={{
                      name: 'ambito',
                      id: 'ambito',
                    }}
                  >
                    <option
                      aria-label={
                        texto.tabs.tabEstancias.form.ambito.placeholder
                      }
                      value=""
                    >
                      {texto.tabs.tabEstancias.form.ambito.placeholder}
                    </option>
                    <option value="Nacional">Nacional</option>
                    <option value="Internacional">Internacional</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={` mt-1`}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={!validForm}
                  onClick={() => addEstancia()}
                  endIcon={<Add />}
                >
                  {texto.tabs.tabEstancias.form.botonAgregar.text}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <div className="table-responsive">
            <Table
              key="ct-table-list-1"
              rows={props.datosEstancias}
              actionColumn={true}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
