import React, { useState, useEffect } from 'react';
import { Grid, Box, FormControl, Button, InputLabel, Input, Select, TextField, Typography } from '@mui/material/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Add } from '@mui/icons-material';
import { texto } from './TextoInterfaces';
import { formCompleto, DateFormat } from './funcionesGeneral';
import Table from './TableCongresos';
import { useSetRecoilState } from 'recoil';
import { actividadesState } from 'pages/seminarios_investigacion/store/actividadesState';
import { DatosCongreso } from '../types'; 

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

  const handleChange = evt => {
    const { target } = evt;
    setCongreso({
      ...congreso,
      [target.name]: target.value,
    });
  };

  const handleDateChange = fecha => {
    setCongreso({
      ...congreso,
      fecha,
    });
  };

  const addCogresoState = (congresoDado: DatosCongreso) => {
    setActividadState( actividadState => ({
      ...actividadState,
      datosCongreso: [
        ...actividadState.datosCongreso, congresoDado
      ]
    }))
    setCongreso(resetCongreso)    
  }

  const addCongreso = () => {
    const idRandom = Math.random()*100;
    let updatedCongreso = Object.assign({}, congreso, {
      ...congreso,
      id: 0,
      key: idRandom,
      fecha: DateFormat(congreso.fecha)
    });
    addCogresoState(updatedCongreso)
  };


  useEffect(() => {
    setValidForm(formCompleto(congreso));
  }, [congreso]);

  return (
    <Box>
      <Grid container spacing={3}>
        {props.estatus === 1 && (
          <>
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
