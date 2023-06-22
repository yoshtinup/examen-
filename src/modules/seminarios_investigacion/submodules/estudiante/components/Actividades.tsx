import React, { useState, useEffect } from 'react';
import { Grid, Box, FormControl, MenuItem, ListItemText, Checkbox, InputLabel, Input, Select, Button } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NoDataOnTable from './NoDataOnTable';
import { texto } from './TextoInterfaces';
import DoneIcon from '@mui/icons-material/Done';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { actividadesState } from 'pages/seminarios_investigacion/store/actividadesState';
import { DatosActividad } from '../types';
import Swal from 'sweetalert2';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default props => {
  const [actividadesList, setActividadesList] = useRecoilState(actividadesState)
  const setActividadState = useSetRecoilState(actividadesState)
  const [modalVisible, setModalVisible] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [mes, setMes] = useState([]);
  const dataMeses = texto.tabs.tabActividades.form.meses.itemMeses;
  const [actividad, setActividad] = useState({
    id: 0,
    key: 0,
    actividad: '',
    meses: [],
  });

  const resetActividad = {
    id: 0,
    key: 0,
    actividad: '',
    meses: [],
  };

  const handleChange = evt => {
    const { target } = evt;
    setActividad({
      ...actividad,
      actividad: target.value,
    });
  };

  const handleSelectChange = evt => {
    const { target } = evt;
    setMes(target.value);
    setValidForm(mes.length > 0);
  };

  const addActividadState = (actividadDado: DatosActividad) => {
    setActividadState( actividadesState => ({
      ...actividadesState,
      datosActividades: [
        ...actividadesState.datosActividades, actividadDado
      ]
    }))
  }

  const addActividad = () => {
    let meses = [];
    const idRandom = Math.random()*100;

    mes.forEach(item => {
      let mes = dataMeses.find(mes => mes.text === item);
      meses.push(mes.value);
    });
    const updatedActividad = Object.assign({}, actividad, {
      ...actividad,
      meses: meses.toString(),
      id: 0,
      key: idRandom,
    });

    addActividadState(updatedActividad)
    setActividad(resetActividad);
    setMes([]);
  };

  const formValid = (actividad, mes) => {
    const datoActividad = actividad.actividad.trim().length > 0;
    setValidForm(datoActividad && mes.length > 0);
  };

  const verCronograma = () => {
    window.open('https://serviciosposgrado.ecosur.mx/Profesores/Content/img/CronogramaDeActividades.png', '_blank');
  };
  
  const handleClickRow = (id: number, key: number) => {
    Swal.fire({
      title: '¿Deseas eliminar esta actividad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(id!== 0){
        setActividadState( actividadState => ({
          ...actividadState,
          actividadesEliminadas: [
            ...actividadState.actividadesEliminadas, id
          ]
        }))
      }
      if (result.isConfirmed) {
        setActividadesList((prev) => ({
          ...prev,
          datosActividades: prev.datosActividades.filter(dato => dato.key !== key),
        }))
        Swal.fire(
          '¡Eliminado!',
          '',
          'success'
        )
      }
    })
    
  };

  useEffect(() => {
    formValid(actividad, mes);
  }, [actividad, mes]);

  return (
    <Box>
      <Grid container spacing={3}>
        {props.estatus === 1 && (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => verCronograma()}
              >
                Ver cronograma de actividades propuesto
              </Button>
             
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="actividad">
                  {texto.tabs.tabActividades.form.actividad.label}
                </InputLabel>
                <Input
                  id="actividad"
                  name="actividad"
                  type="text"
                  value={actividad.actividad}
                  onChange={handleChange}
                  placeholder={
                    texto.tabs.tabActividades.form.actividad.placeholder
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <InputLabel id="mes">
                  {texto.tabs.tabActividades.form.meses.label}
                </InputLabel>
                <Select
                  labelId="mes"
                  id="mes"
                  name="mes"
                  multiple
                  value={mes}
                  onChange={handleSelectChange}
                  input={<Input />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {dataMeses.map(item => (
                    <MenuItem key={item.value} value={item.text}>
                      <Checkbox checked={mes.indexOf(item.text) > -1} />
                      <ListItemText primary={item.text} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={!validForm}
                onClick={() => addActividad()}
              >
                {texto.tabs.tabActividades.form.botonAgregar.text}
              </Button>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} spacing={3}>
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-actividades" style={{ width: '100%' }}>
              <thead className="ant-table-thead">
                <tr>
                  {texto.tabs.tabActividades.tabla
                    .columnasTabla(props)
                    .map((col, index) => (
                      <th key={index * 0.3}>
                        <span className="ant-table-header-column">
                          <div>
                            <span className="ant-table-column-title">
                              {col}
                            </span>
                          </div>
                        </span>

                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {props.datosActividades &&
                  props.datosActividades.length > 0 &&
                  props.datosActividades.map((actividad, index) => (
                    <tr key={index * 0.2}>
                      <td>{actividad.actividad}</td>
                      <td style={{ textAlign: 'center' }} className="actividades">
                        {actividad.meses.includes('1') ? <DoneIcon/> : "" }
                      </td>
                      <td style={{ textAlign: 'center' }} className="actividades">
                        {actividad.meses.includes('2') ? <DoneIcon/> : ""}
                      </td>
                      <td style={{ textAlign: 'center' }} className="actividades">
                        {actividad.meses.includes('3') ? <DoneIcon/> : ""}
                      </td>
                      <td style={{ textAlign: 'center' }} className="actividades">
                        {actividad.meses.includes('4') ? <DoneIcon/> : ""}
                      </td>
                      <td style={{ textAlign: 'center' }} className="actividades">
                        {actividad.meses.includes('5') ? <DoneIcon/> : ""}
                      </td>
                      <td style={{ textAlign: 'center' }} className="actividades">
                        {actividad.meses.includes('6') ? <DoneIcon/> : ""}
                      </td>
                      {props.estatus === 1 && (
                        <td>
                          
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<AccountBoxIcon />}
                            onClick={()=> {handleClickRow(actividad.id, actividad.key)}}
                          >
                            Eliminar
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
            {props.datosActividades && props.datosActividades.length === 0 && (
              <NoDataOnTable />
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
