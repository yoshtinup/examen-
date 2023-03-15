import { useRecoilValue, useRecoilState } from 'recoil'
import { actividadesState as actState } from 'pages/seminarios_investigacion/store/actividadesState';
import { Actividades } from './types';
// import { Actividades } from "../submodules/estudiante/types";

import actividadesService from  'pages/seminarios_investigacion/services/actividadesService'
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
  Alert
} from '@mui/material';
import { Save, Send } from '@mui/icons-material';
import 'moment/locale/es';
import { texto, notificaciones } from './components/TextoInterfaces';
/*import {
  guardarTemporalSeminario,
  guardarFinalizarSeminario,
  cargarDatosSeminario,
} from 'actions/seminario-investigacion/asyncActions';
*/
import Instrucciones from './components/Instrucciones';
import Pestanias from './components/Pestanias';
import datos from './components/initialState';
import { actividadesState } from 'pages/seminarios_investigacion/store/actividadesState';
import { useQuery, QueryClient } from "react-query"


import axios from 'axios'
import  SeminarioInvestigacion  from '@modules/seminarios_investigacion/queries/apiRest';


const meses = [1, 2, 3, 4, 5, 6];
const loadingIcon = size => (
  <CircularProgress variant="indeterminate" color="inherit" size={size} />
);

const getActividadesSeminario = async () => {
  let data
  // const response = await fetch('http://localhost:3001/actividades', {
  const response = await fetch('http://localhost:3001/actividadesget', {
      headers: {
          'Content-Type': 'application-json',
          // 'Content': 'application-json'
      }
  })
  .then(response => response.json())
  .then(datos => data = datos);
  return data
}




const Evaluacion = props => {
  
  const [gridState, setGridState] = useState()
  const [actividadesList, setActividadesList2] = useRecoilState(actState)
  const idSeminario = props.idseminario;
  

  const enviarEvaluacion = null;
  const datosActividades = null;

  const enviarAFirma = () =>{
    console.log('enviar a firma')
  }

  const guardarActividades = () => {
    console.log('guardar las actividades')
  }

  

  
  const solicitarDatosSeminarioInv = async () => {
    const actividadesSeminario = await SeminarioInvestigacion.getDatosEvaluacionSeminario(idSeminario)
    setActividadesList2(actividadesSeminario) 
  }
  useEffect(()=>{
    solicitarDatosSeminarioInv()

  },[])
  
  //FIXME: IOG obtener los datos del estudiante

  
  

  

  return (
    <>
      <div className="container-fluid chapter page-icons pt-2 mb-3">
        <div key="1" className="mb-3">
          <div className="box box-default">
            <div className="box-body">
              <div className="row pl-3">
                <Typography variant="h5">{texto.encabezado}</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid chapter page-icons pt-2 mb-3">
        <div key="1" className="mb-3">
          <div className="box box-default">
            <div className="box-body">
              <div className="row">
                <Container maxWidth="xl">
                  {
                    //Mostramos error si lo hubieron (Al hacer la petición)
                    props.errorSolicitudSeminario && (
                      <div className="col">
                        <h4>
                          <b>Error: </b>
                          <b className="text-danger">
                            {props.errorSolicitudSeminario}
                          </b>
                        </h4>
                      </div>
                    )
                  }
                  {!props.errorSolicitudSeminario && (
                    <>
                      {
                        //FIXME: IOG pasar el datos del programa del estudiante
                        //Pintamos las instrucciones solo si el estatus es 1
                        datos.estatus && datos.estatus.id === 1 && (
                          <Instrucciones IdPrograma={1} />
                        )
                      }

                      <Pestanias { ...actividadesList} />
                      {
                        //Pintamos los botones de guardar solo si el estatus es 1
                        datos.estatus && datos.estatus.id === 1 && (
                          <Grid item xs={12} className={` mt-3`}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={` btn btn-success`}
                              onClick={() => guardarActividades()}
                              endIcon={<Save />}
                            >
                              Guardar
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => enviarAFirma()}
                              endIcon={<Send />}
                            >
                              Firmar
                            </Button>
                            {
                              //Pintamos errores al guardar (En caso de que los haya)
                              (props.errorSolicitudGuardarSeminario ||
                                props.errorSolicitudEnviarSeminario) && (
                                <h4>
                                  <b className="text-danger">
                                    {props.errorSolicitudGuardarSeminario ||
                                      props.errorSolicitudEnviarSeminario}
                                  </b>
                                </h4>
                              )
                            }
                          </Grid>
                        )
                      }
                    </>
                  )}
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Evaluacion;
