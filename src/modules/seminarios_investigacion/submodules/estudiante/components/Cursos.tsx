import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import {
  Grid,
  Box,
  FormControl,
  Button,
  InputLabel,
  Input,
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

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { actividadesState } from 'pages/seminarios_investigacion/store/actividadesState';
import { DatosCursoExterno } from '../types';

//import { agregarCurso, handleSinCursos } from 'actions/seminario-investigacion';
import Table from './TableCursos';

import axios from 'axios'

export default props => {
  const setCursoState = useSetRecoilState(actividadesState)

  const [validForm, setValidForm] = useState(false);
  const [fechaFinCorrecta, setFechaFinCorrecta] = useState(false);
  const [curso, setCurso] = useState({
    id: 0,
    key: 0,
    otraInstitucion: '',
    nombreCurso: '',
    fechaInicio: new Date(),
    fechaConclusion: new Date(),
  });

  const resetCurso = {
    id: 0,
    key: 0,
    otraInstitucion: '',
    nombreCurso: '',
    fechaInicio: new Date(),
    fechaConclusion: new Date(),
  };

  const TextPopover = () => (
    <>
      <Typography variant="inherit" className="text-navy">
        <b>¿Esta seguro/a de que no registrará cursos externos?</b>
      </Typography>
      <br />
      <Typography variant="inherit">
        ¡Se eliminarán los cursos externos previamente registrados!
      </Typography>
    </>
  );

  /*
  const CustomSwith = () => {
    if (props.datosCursosExternos && props.datosCursosExternos.length > 0) {
      return (
        <Popconfirm
          title={<TextPopover />}
          cancelText="Cancelar"
          okText="Aceptar"
          icon={<QuestionCircleOutlined twoToneColor="#B00000" />}
          onConfirm={() => dispatch(handleSinCursos())}
        >
          <Switch checked={!props.tieneCursos} />
        </Popconfirm>
      );
    }
    return (
      <Switch
        checked={!props.tieneCursos}
        onChange={() => dispatch(handleSinCursos())}
      />
    );
  };*/

  const handleChange = evt => {
    const { target } = evt;
    setCurso({
      ...curso,
      [target.name]: target.value,
    });
  };

  const handleFechaInicio = fecha => {
    setCurso({
      ...curso,
      fechaInicio: fecha,
    });
    const rangoFechasValidas = rangoFechasValido(fecha, curso.fechaConclusion);
    if (!rangoFechasValidas) {
      notificaciones.fechaConclusionIncorrecta();
    }
    setFechaFinCorrecta(rangoFechasValidas);
  };

  const handleFechaConclusion = fecha => {
    setCurso({
      ...curso,
      fechaConclusion: fecha,
    });
    const rangoFechasValidas = rangoFechasValido(curso.fechaInicio, fecha);
    if (!rangoFechasValidas) {
      notificaciones.fechaConclusionIncorrecta();
    }
    setFechaFinCorrecta(rangoFechasValidas);
  };

  const addCursoExternoState = (cursoExternoDado: DatosCursoExterno) =>{
    
    setCursoState(actividadesState => ({
      ...actividadesState,
      datosCursosExternos: [
        ...actividadesState.datosCursosExternos, cursoExternoDado
      ]
    }))
    
  }

  const addCurso = () => {
    const idRandom = Math.random()*100;
    const updatedCurso = Object.assign({}, curso, {
      ...curso,
      // fechaInicio: moment(curso.fechaInicio).format('DD-MM-yyyy'),
      fechaInicio: moment(curso.fechaInicio).format('yyyy'),
      fechaConclusion: moment(curso.fechaConclusion).format('yyyy'),
      id: 0,
      key: idRandom,
    });
    addCursoExternoState(updatedCurso)
    //dispatch(agregarCurso(updatedCurso));
  };

  const formValid = curso => {
    const datosLlenos = formCompleto(curso);
    const rangoFechasValidas = rangoFechasValido(
      curso.fechaInicio,
      curso.fechaConclusion
    );
    setValidForm(datosLlenos && rangoFechasValidas);
  };

  // const Indicator = () => <p />;

  useEffect(() => {
    formValid(curso);
  }, [curso]);

  return (
    <Box>
      <Grid container spacing={3}>
        <>
          {props.estatus === 1 && (
            <>
              <Grid container spacing={3}>
                <>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="otraInstitucion">
                        {texto.tabs.tabCursos.form.otraInstitucion.label}
                      </InputLabel>
                      <Input
                        id="otraInstitucion"
                        name="otraInstitucion"
                        type="text"
                        value={curso.otraInstitucion}
                        onChange={handleChange}
                        placeholder={
                          texto.tabs.tabCursos.form.otraInstitucion.placeholder
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="nombreCurso">
                        {texto.tabs.tabCursos.form.nombreCurso.label}
                      </InputLabel>
                      <Input
                        id="nombreCurso"
                        name="nombreCurso"
                        type="text"
                        value={curso.nombreCurso}
                        onChange={handleChange}
                        placeholder={
                          texto.tabs.tabCursos.form.nombreCurso.placeholder
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <FormControl fullWidth variant="outlined">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={curso.fechaInicio}
                          label={texto.tabs.tabCursos.form.fechaInicio.label}
                          onChange={fecha => handleFechaInicio(fecha)}
                          renderInput={params => <TextField {...params} />}
                          // inputFormat="YYYY-MM-DD"
                          // views={["year", "month", "day"]}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <FormControl fullWidth variant="outlined">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={curso.fechaConclusion}
                          label={
                            texto.tabs.tabCursos.form.fechaConclusion.label
                          }
                          onChange={fecha => handleFechaConclusion(fecha)}
                          renderInput={params => <TextField {...params} />}
                          // inputFormat="YYYY-MM-DD"
                          // views={["year", "month", "day"]}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={` mt-1`}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={!validForm}
                      onClick={() => addCurso()}
                      endIcon={<Add />}
                    >
                      {texto.tabs.tabCursos.form.botonAgregar.text}
                    </Button>
                  </Grid>
                </>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <div className="table-responsive">
              <Table
                key="ct-table-list-1"
                rows={props.datosCursosExternos}
                actionColumn={true}
              />
            </div>
          </Grid>
        </>
      </Grid>
    </Box>
  );
};
