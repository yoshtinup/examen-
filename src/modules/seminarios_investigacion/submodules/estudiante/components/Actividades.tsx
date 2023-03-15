import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Grid,
  Box,
  FormControl,
  MenuItem,
  ListItemText,
  Checkbox,
  InputLabel,
  Input,
  Select,
  Button,
} from '@mui/material';
import NoDataOnTable from './NoDataOnTable';
import { texto } from './TextoInterfaces';

import { useSetRecoilState } from 'recoil';
import { actividadesState } from 'pages/seminarios_investigacion/store/actividadesState';
import { DatosActividad } from '../types';
import axios from 'axios'
/* import { agregarActividad } from 'actions/seminario-investigacion' */
/* import { cronogramaBase64 } from './cronograma' */

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
      id: idRandom,
      key: idRandom,
    });

    addActividadState(updatedActividad)
    //dispatch(agregarActividad(updatedActividad));
    setActividad(resetActividad);
    setMes([]);
  };

  const formValid = (actividad, mes) => {
    const datoActividad = actividad.actividad.trim().length > 0;
    setValidForm(datoActividad && mes.length > 0);
  };

  const showModal = () => setModalVisible(true);
  const handleCancel = () => setModalVisible(false);

  useEffect(() => {
    formValid(actividad, mes);
  }, [actividad, mes]);

  return (
    <Box>
      <Grid container spacing={3}>
        {props.estatus.id === 1 && (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => showModal()}
              >
                Ver cronograma de actividades propuesto
              </Button>
              {/* <Modal
                visible={modalVisible}
                onCancel={() => handleCancel()}
                footer={null}
                className="custom-modal-v1"
                centered
              >
                <img
                  src={cronogramaBase64}
                  alt="Cronograma de actividades"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </Modal> */}
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
        <Grid item xs={12}>
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-actividades">
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
                      <td className="actividades">
                        {actividad.meses.includes('1') && <div />}
                      </td>
                      <td className="actividades">
                        {actividad.meses.includes('2') && <div />}
                      </td>
                      <td className="actividades">
                        {actividad.meses.includes('3') && <div />}
                      </td>
                      <td className="actividades">
                        {actividad.meses.includes('4') && <div />}
                      </td>
                      <td className="actividades">
                        {actividad.meses.includes('5') && <div />}
                      </td>
                      <td className="actividades">
                        {actividad.meses.includes('6') && <div />}
                      </td>
                      {props.estatus.id === 1 && (
                        <td>
                          {/*   <Popconfirm
                            title={`¿Eliminar actividad?`}
                            cancelText="Cancelar"
                            okText="Aceptar"
                            onConfirm={() => props.removerActividad(actividad)}
                          >
                            <button className="link-button">
                              <Icon type="delete" style={{ color: 'red' }} />
                              {
                                texto.tabs.tabActividades.tabla.botonEliminar
                                  .text
                              }
                            </button>
                          </Popconfirm> */}
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
