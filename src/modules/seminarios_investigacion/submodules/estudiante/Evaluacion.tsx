import { useRecoilValue, useRecoilState } from 'recoil'
import { actividadesState as actState } from 'pages/seminarios_investigacion/store/actividadesState';
import { Actividades } from './types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

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
import { getIdClavePrograma } from './components/funcionesGeneral';
import Swal from 'sweetalert2';


import axios from 'axios'
import  SeminarioInvestigacion  from '@modules/seminarios_investigacion/queries/apiRest';


const meses = [1, 2, 3, 4, 5, 6];
const loadingIcon = size => (
  <CircularProgress variant="indeterminate" color="inherit" size={size} />
);

const Evaluacion = props => {
  const router = useRouter()
  const cookieUser = Cookies.get('user');
  const [gridState, setGridState] = useState()
  const [actividadesList, setActividadesList2] = useRecoilState(actState)
  
  const idSeminario = props.idseminario;
  

  const enviarEvaluacion = null;
  const datosActividades = null;
  let idClavePrograma = 0;

  const enviarAFirma = () =>{
    Swal.fire({
      title: '¿Esta seguro/a de firmar?',
      text: "Una vez que firme no podrá editar la información. Se enviará notificación a su director/a de tesis para que revise y registre calificación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(async (result) => {
      if(result.isConfirmed){

        setActividadesList2((prev) => ({
          ...prev,
          estatus: 2,
        }))
        await console.log("firmar data", actividadesList)
        // SeminarioInvestigacion.guardarActividadesPosgrado(actividadesList)
        // .then((respuesta)=>{
        //   if(respuesta.message){
        //     Swal.fire({
        //       icon: 'success',
        //       title: 'Enhorabuena!',
        //       text: 'Se firmó y se notifico al director/a de tesis',
        //       confirmButtonText: 'Continuar',
        //       preConfirm: () =>{
        //         router.push('http://localhost:3000/');
        //       }
        //     })
        //   }else{
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Upss!',
        //       text: respuesta.errors
        //     })
        //   }
        //   console.log("respuesta", respuesta)
        // })
      }
    })
  }

  const guardarActividades = async () => {
    console.log('guardar las actividades')
    console.log("actividadesList", actividadesList.datosActividades[0].meses)
    let mesesAsignados = []
    await getIdClavePrograma().then((r)=>{
      idClavePrograma = r;
      console.log("eval", idClavePrograma)
    })
    actividadesList.datosActividades.map((elemento) => {
      console.log(elemento.meses)
      if(elemento.meses.includes("1")){
        console.log("existe el mes enero")
        mesesAsignados.push(1)
      }
      if(elemento.meses.includes("2")){
        console.log("existe el mes febrero")
        mesesAsignados.push(2)
      }
      if(elemento.meses.includes("3")){
        console.log("existe el mes marzo")
        mesesAsignados.push(3)     
      }
      if(elemento.meses.includes("4")){
        console.log("existe el mes abril")
        mesesAsignados.push(4)
      }
      if(elemento.meses.includes("5")){
        console.log("existe el mes mayo")
        mesesAsignados.push(5)

      }
      if(elemento.meses.includes("6")){
        console.log("existe el mes junio")
        mesesAsignados.push(6)

      }
      
    })
    const meses = [1, 2, 3, 4 , 5, 6];
    let faltaMeses = false;
    meses.filter(num => {
      if(!mesesAsignados.includes(num)){
        faltaMeses = true;
      }
    });
    console.log(mesesAsignados)
    console.log("falta meses", faltaMeses)
    if(idClavePrograma == 1){
      console.log("SI es uno")

    }
    if(faltaMeses && idClavePrograma == 1){
      Swal.fire({
        icon: 'warning',
        title: 'No se puede guardar!',
        text: 'Se necesita registar actividades para los 6 meses'
      })
    }else{
      SeminarioInvestigacion.guardarActividadesPosgrado(actividadesList)
      .then((respuesta)=>{
        if(respuesta.message){
          Swal.fire({
            icon: 'success',
            title: 'Enhorabuena!',
            text: respuesta.message
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Upss!',
            text: respuesta.errors
          })
        }
        console.log("respuesta", respuesta)
      })

    }
    
  }

  

  
  const solicitarDatosSeminarioInv = async () => {
    const actividadesSeminario = await SeminarioInvestigacion.getDatosEvaluacionSeminario(idSeminario)
    setActividadesList2(actividadesSeminario)
    let idEvaSeminarioInv = actividadesSeminario.datosSeminario.idSeminario;
    console.log("idEvaSeminarioInv", idEvaSeminarioInv)
    if(actividadesSeminario.estatus.id == 2){
      router.push("http://localhost:3000/")
    }else{
      setActividadesList2((prev) => ({
        ...prev,
        estatus: 1,
        congresosEliminados: [],
        actividadesEliminadas: [],
        cursosExternosEliminados: [],
        estanciasEliminadas: [],
        publicacionesEliminadas: [],
        idEvaluacionSeminarioInvestigacion: idEvaSeminarioInv
      }))

    }
    // console.log("idseminario", actividadesList.datosSeminario)
  }
  useEffect( () =>{
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
