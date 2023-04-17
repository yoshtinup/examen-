import React, { useState, useEffect } from 'react';
import { Grid, Box, FormControl, Button, InputLabel, Input, Select, TextField } from '@mui/material/';
import { Add } from '@mui/icons-material';
import { texto } from './TextoInterfaces';
import { formCompleto } from './funcionesGeneral';
import Table from './TablePublicaciones';
import { useSetRecoilState } from 'recoil';
import { actividadesState } from 'pages/seminarios_investigacion/store/actividadesState';
import { DatosPublicacione } from '../types';

export default props => {
  const setPublicacionState = useSetRecoilState(actividadesState) 
  const [validForm, setValidForm] = useState(false);
  const [publicacion, setPublicacion] = useState({
    id: 0,
    key: 0,
    titulo: '',
    publicacionEn: '',
    tipoParticipacion: '',
    idTipoPublicacion: '',
    tipoPublicacion: '',
    tipoArbitrado: '',
  });

  const resetPublicacion = {
    id: 0,
    key: 0,
    titulo: '',
    publicacionEn: '',
    tipoParticipacion: '',
    idTipoPublicacion: '',
    tipoPublicacion: '',
    tipoArbitrado: '',
  };

  const handleChange = evt => {
    const { target } = evt;
    setPublicacion({
      ...publicacion,
      [target.name]: target.value,
    });
  };

  const handleSelectTPChange = evt => {
    const { target } = evt;
    const { options } = target;
    const option = options[options.selectedIndex];
    setPublicacion({
      ...publicacion,
      [target.name]: target.value,
      tipoPublicacion: option.label,
    });
  };

  const addPublicacionesState = (publicacionDado: DatosPublicacione) => {
    setPublicacionState( actividadesState => ({
      ...actividadesState,
      datosPublicaciones: [
        ...actividadesState.datosPublicaciones, publicacionDado
      ]
    }))
    setPublicacion(resetPublicacion)
  }

  const addPublicacion = () => {
    const idRandom = Math.random()*100;
    const updatedPublicacion = Object.assign({}, publicacion, {
      ...publicacion,
      id: 0,
      key: idRandom,
      idTipoPublicacion: Number(publicacion.idTipoPublicacion),
      
    });
    addPublicacionesState(updatedPublicacion)
  };

  useEffect(() => {
    setValidForm(formCompleto(publicacion));
  }, [publicacion]);

  return (
    <Box>
      <Grid container spacing={3}>
        {props.estatus === 1 && (
          <>
            <Grid item xs={12}></Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="titulo">
                    {texto.tabs.tabPublicaciones.form.titulo.label}
                  </InputLabel>
                  <Input
                    id="titulo"
                    name="titulo"
                    type="text"
                    value={publicacion.titulo}
                    onChange={handleChange}
                    placeholder={
                      texto.tabs.tabPublicaciones.form.titulo.placeholder
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="publicacionEn">
                    {texto.tabs.tabPublicaciones.form.publicacionEn.label}
                  </InputLabel>
                  <Input
                    id="publicacionEn"
                    name="publicacionEn"
                    type="text"
                    value={publicacion.publicacionEn}
                    onChange={handleChange}
                    placeholder={
                      texto.tabs.tabPublicaciones.form.publicacionEn.placeholder
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="tipoParticipacion">
                    {texto.tabs.tabPublicaciones.form.tipoParticipacion.label}
                  </InputLabel>
                  <Select
                    native
                    id="tipoParticipacion"
                    value={publicacion.tipoParticipacion}
                    onChange={handleChange}
                    inputProps={{
                      name: 'tipoParticipacion',
                      id: 'tipoParticipacion',
                    }}
                  >
                    <option
                      aria-label={
                        texto.tabs.tabPublicaciones.form.tipoParticipacion
                          .placeholder
                      }
                      value=""
                    >
                      {
                        texto.tabs.tabPublicaciones.form.tipoParticipacion
                          .placeholder
                      }
                    </option>
                    <option value="Autor">Autor</option>
                    <option value="Coautor">Coautor</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <FormControl fullWidth>
                  {props.catalogoPublicaciones ? (
                    <>
                      <InputLabel shrink htmlFor="idTipoPublicacion">
                        {
                          texto.tabs.tabPublicaciones.form.idTipoPublicacion
                            .label
                        }
                      </InputLabel>
                      <Select
                        native
                        id="idTipoPublicacion"
                        value={publicacion.idTipoPublicacion}
                        onChange={handleSelectTPChange}
                        inputProps={{
                          name: 'idTipoPublicacion',
                          id: 'idTipoPublicacion',
                        }}
                      >
                        <option
                          aria-label={
                            texto.tabs.tabPublicaciones.form.idTipoPublicacion
                              .placeholder
                          }
                          value=""
                        >
                          {
                            texto.tabs.tabPublicaciones.form.idTipoPublicacion
                              .placeholder
                          }
                        </option>
                        {props.catalogoPublicaciones.map((item, index) => (
                          <option key={index * 0.4} value={item.idCatalogo}>
                            {item.tipoPublicacion}
                          </option>
                        ))}
                      </Select>
                    </>
                  ) : (
                    <TextField
                      error
                      label={
                        texto.tabs.tabPublicaciones.form.idTipoPublicacion.label
                      }
                      InputProps={{
                        readOnly: true,
                        style: { color: 'red' },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      defaultValue="No se encontró el catálogo de tipo de publicaciones"
                    />
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="tipoArbitrado">
                    {texto.tabs.tabPublicaciones.form.tipoArbitrado.label}
                  </InputLabel>
                  <Select
                    native
                    id="tipoArbitrado"
                    value={publicacion.tipoArbitrado}
                    onChange={handleChange}
                    inputProps={{
                      name: 'tipoArbitrado',
                      id: 'tipoArbitrado',
                    }}
                  >
                    <option
                      aria-label={
                        texto.tabs.tabPublicaciones.form.tipoArbitrado
                          .placeholder
                      }
                      value=""
                    >
                      {
                        texto.tabs.tabPublicaciones.form.tipoArbitrado
                          .placeholder
                      }
                    </option>
                    <option value="Arbitrado">Arbitrado</option>
                    <option value="Divulgación">Divulgación</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={` mt-1`}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={!validForm}
                  onClick={() => addPublicacion()}
                  endIcon={<Add />}
                >
                  {texto.tabs.tabPublicaciones.form.botonAgregar.text}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <div className="table-responsive">
            <Table
              key="ct-table-list-1"
              rows={props.datosPublicaciones}
              actionColumn={true}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
