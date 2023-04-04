import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/material/styles';
import { Box, Grid, AppBar, Tabs, Tab, Typography } from '@mui/material';
import { texto } from '../components/TextoInterfaces';
import Publicaciones from './Publicaciones';
import { useRecoilValue } from 'recoil';
import { userStateAtom } from '@modules/auth/recoil';
import { EcosurAuth } from '@modules/auth/definitions';
import Cookies from 'js-cookie';
import { jwtVerify } from 'jose';
import Congresos from './Congresos';
import Estancias from './Estancias';
import Cursos from './Cursos';
import { getIdClavePrograma } from './funcionesGeneral';


import Actividades from './Actividades';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  
  return (
    <div
      className="tabpanel"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


export default props => {
  /*const user: EcosurAuth = useRecoilValue(userStateAtom);
  const idPrograma = user.estudiante?.clavePrograma;
  */

  const [idClavePrograma, setIdClavePorgrama] = useState(0);

  console.log("Mis props en pestanias")
  console.log(props)
  getIdClavePrograma().then((r)=>{
    console.log("respuesta",r)
    setIdClavePorgrama(r)
  })

  
  const idPrograma = 1;
  
  const [tab, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid container className="mt-3">
        <Grid item xs={12} className="mb-3">
          <Typography
            variant="subtitle1"
            style={{ display: 'inline-block' }}
          >{`Actividades realizadas en el ${
            idPrograma === 1 ? `cuatrimestre` : `semestre`
          }`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit">
            <Tabs
              value={tab}
              onChange={handleChange}
              variant="scrollable"
              indicatorColor="secondary"
              textColor="inherit"
              aria-label="scrollable force tabs"
            >
              <Tab label={texto.tabs.tabCongresos.titulo} {...a11yProps(0)} />
              <Tab label={texto.tabs.tabEstancias.titulo} {...a11yProps(1)} />
              <Tab label={texto.tabs.tabCursos.titulo} {...a11yProps(2)} />
              <Tab
                label={texto.tabs.tabPublicaciones.titulo}
                {...a11yProps(3)}
              />
              {idClavePrograma === 1 && (
                <Tab
                  label={texto.tabs.tabActividades.titulo}
                  {...a11yProps(4)}
                />
              )}
            </Tabs>
          </AppBar>
          {
            <TabPanel value={tab} index={0}>
              {/* { props.datoscongreso.lenght && <Component> </Component>} */}
              {/* {props.datosCongreso.length > 0 && */}
                <Congresos
                  datosCongreso={props.datosCongreso}
                  removerCongreso={props.removerCongreso}
                  estatus={props.estatus}
                  tieneCongresos={props.tieneCongresos}
                />
              
              {/* } */}
              
              
            </TabPanel>
          }
          <TabPanel value={tab} index={1}>
            <Estancias
              datosEstancias={props.datosEstancias}
              removerEstancia={props.removerEstancia}
              estatus={props.estatus}
              tieneEstancias={props.tieneEstancias}
            />
          </TabPanel>

          <TabPanel value={tab} index={2}>
            <Cursos
              datosCursosExternos={props.datosCursosExternos}
              removerCurso={props.removerCurso}
              estatus={props.estatus}
              tieneCursos={props.tieneCursos}
            />
          </TabPanel>

          <TabPanel value={tab} index={3}>
            <Publicaciones
              datosPublicaciones={props.datosPublicaciones}
              removerPublicacion={props.removerPublicacion}
              estatus={props.estatus}
              catalogoPublicaciones={props.catalogoPublicaciones}
              tienePublicaciones={props.tienePublicaciones}
            />
          </TabPanel>

          { idClavePrograma === 1 && (
            <TabPanel value={tab} index={4}>
              <Actividades
                datosActividades={props.datosActividades}
                removerActividad={props.removerActividad}
                estatus={props.estatus}
              />
            </TabPanel>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
