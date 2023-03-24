import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  FormControl,
  Button,
  InputLabel,
  Input,
  Select,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { Add } from '@mui/icons-material';
import Switch from './Switch';
import { texto } from './TextoInterfaces';
import { formCompleto } from './funcionesGeneral';
import Table from './TableCongresos';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { actividadesState } from 'pages/seminarios_investigacion/store/actividadesState';
import { Actividades, DatosActividad, DatosCongreso } from '../types'; 

/*import {
  agregarCongreso,
  handleSinCongreso,
} from 'actions/seminario-investigacion/index';
*/

export default props => {
  const setActividadState = useSetRecoilState(actividadesState);
  
  const [validForm, setValidForm] = useState(false);
  const [congreso, setCongreso] = useState({
    id: 0,
    key: 0,
    titulo: '',
    lugar: '',
    fecha: new Date().toString(),
    tipoParticipacion: '',
  });
  let resetCongreso = {
    id: 0,
    key: 0,
    titulo: '',
    lugar: '',
    fecha: new Date().toString(),
    tipoParticipacion: '',
  };

  const TextPopover = () => (
    <>
      <Typography variant="inherit" className="text-navy">
        <b>¿Esta seguro/a de que no registrará congresos?</b>
      </Typography>
      <br />
      <Typography variant="inherit">
        ¡Se eliminarán los congresos previamente registrados!
      </Typography>
    </>
  );
  /*
  const CustomSwith = () => {
    if (props.datosCongreso && props.datosCongreso.length > 0) {
      return (
        <Popconfirm
          title={<TextPopover />}
          cancelText="Cancelar"
          okText="Aceptar"
          icon={<QuestionCircleOutlined twoToneColor="#B00000" />}
          onConfirm={() => dispatch(handleSinCongreso())}
        >
          <Switch checked={!props.tieneCongresos} />
        </Popconfirm>
      );
    }
    return (
      <Switch
        checked={!props.tieneCongresos}
        onChange={() => dispatch(handleSinCongreso())}
      />
    );
  };*/

  const handleChange = evt => {
    const { target } = evt;
    setCongreso({
      ...congreso,
      [target.name]: target.value,
    });
  };

  const handleDateChange = fecha => {
  
    const fechaConvertir = new Date(fecha)
    // const fechaAdd = fechaConvertir.getFullYear().toString() + "-"+fechaConvertir.getMonth().toString() + "-" + fechaConvertir.getDay().toString()
    // console.log("fecha", fechaAdd)
    setCongreso({
      ...congreso,
      fecha,
    });
  };

  const congresoAd: DatosCongreso = {
    
    id: 0,
    key: 0,
    fecha: new Date().toString(),
    lugar: congreso.lugar,
    tipoParticipacion: congreso.tipoParticipacion,
    titulo: congreso.titulo
  };



  const addCogresoState = (congresoDado: DatosCongreso) => {
    
    setActividadState( actividadState => ({
      ...actividadState,
      datosCongreso: [
        ...actividadState.datosCongreso, congresoDado
      ]
    }))
    
  
    
  }

  const addCongreso = () => {
    const idRandom = Math.random()*100;
    let updatedCongreso = Object.assign({}, congreso, {
      ...congreso,
      id: 0,
      key: idRandom,
      fecha: moment(congreso.fecha).format('yyyy-MM-DD'),
    });
    console.log("updatedCongreso");
    console.log(updatedCongreso);
    console.log(congreso.fecha)
    console.log(congreso.titulo)
    console.log(congreso.tipoParticipacion)
    addCogresoState(updatedCongreso)
    

  };

  const Indicator = () => <p />;

  useEffect(() => {
    setValidForm(formCompleto(congreso));
  }, [congreso]);

  // console.log("props.estatus.id: "+props.estatus.id)
  return (
    <Box>
      <Grid container spacing={3}>
        {props.estatus === 1 && (
          
          <>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<CustomSwith />}
                label="No participé en congresos"
                style={{ color: '#000', fontWeight: 'bolder' }}
                
              />
            </Grid> */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="titulo">
                    {texto.tabs.tabCongresos.form.titulo.label}
                  </InputLabel>
                  <Input
                    id="titulo"
                    name="titulo"
                    type="text"
                    value={congreso.titulo}
                    onChange={evt => handleChange(evt)}
                    placeholder={
                      texto.tabs.tabCongresos.form.titulo.placeholder
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="lugar">
                    {texto.tabs.tabCongresos.form.lugar.label}
                  </InputLabel>
                  <Input
                    id="lugar"
                    name="lugar"
                    type="text"
                    value={congreso.lugar}
                    onChange={evt => handleChange(evt)}
                    placeholder={texto.tabs.tabCongresos.form.lugar.placeholder}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={congreso.fecha}
                      label={texto.tabs.tabCongresos.form.fecha.label}
                      onChange={fecha => handleDateChange(fecha)}
                      renderInput={params => <TextField {...params} />}
                      inputFormat="YYYY-MM-DD"
                      views={["year", "month", "day"]}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="tipoParticipacion">
                    {texto.tabs.tabCongresos.form.tipoParticipacion.label}
                  </InputLabel>
                  <Select
                    native
                    value={congreso.tipoParticipacion}
                    onChange={evt => handleChange(evt)}
                    inputProps={{
                      name: 'tipoParticipacion',
                      id: 'tipoParticipacion',
                    }}
                  >
                    <option
                      aria-label={
                        texto.tabs.tabCongresos.form.tipoParticipacion
                          .placeholder
                      }
                      value=""
                    >
                      {
                        texto.tabs.tabCongresos.form.tipoParticipacion
                          .placeholder
                      }
                    </option>
                    <option value="Ponente">Ponente</option>
                    <option value="Asistente">Asistente</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={` mt-1`}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={!validForm}
                  onClick={() => addCongreso()}
                  endIcon={<Add />}
                >
                  {texto.tabs.tabCongresos.form.botonAgregar.text}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <div className="table-responsive">
            
              <Table
                key="ct-table-list-1"
                rows={props.datosCongreso}
                actionColumn={true}
              />

            
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
