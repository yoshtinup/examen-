import { useRecoilValue, useRecoilState } from 'recoil'
import { actividadesState as actState } from 'pages/seminarios_investigacion/store/actividadesState';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import {  Container, Box, Grid, Button,CircularProgress } from '@mui/material';
import { Save, Send } from '@mui/icons-material';
import 'moment/locale/es';
import Instrucciones from './components/Instrucciones';
import Pestanias from './components/Pestanias';
import datos from './components/initialState';
import { getIdClavePrograma } from './components/funcionesGeneral';
import Swal from 'sweetalert2';
import { Layout } from '@shared/components/layouts';
import  SeminarioInvestigacion  from '@modules/seminarios_investigacion/queries/apiRest';
import { HeaderSection } from '@shared/components';


const meses = [1, 2, 3, 4, 5, 6];
const loadingIcon = size => (
  <CircularProgress variant="indeterminate" color="inherit" size={size} />
);

const Evaluacion = props => {
  const router = useRouter()
  const [actividadesList, setActividadesList2] = useRecoilState(actState)
  const idSeminario = props.idseminario;
  let idClavePrograma = 0;

  const enviarAFirma =  () =>{
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
        const cloneActividadesList = Object.assign({}, actividadesList);
        cloneActividadesList.estatus = 2;

        let mesesAsignados = []
        await getIdClavePrograma().then((r)=>{
          idClavePrograma = r;
        })
        actividadesList.datosActividades.map((elemento) => {
          if(elemento.meses.includes("1")){
            mesesAsignados.push(1)
          }
          if(elemento.meses.includes("2")){
            mesesAsignados.push(2)
          }
          if(elemento.meses.includes("3")){
            mesesAsignados.push(3)     
          }
          if(elemento.meses.includes("4")){
            mesesAsignados.push(4)
          }
          if(elemento.meses.includes("5")){
            mesesAsignados.push(5)

          }
          if(elemento.meses.includes("6")){
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
        if(faltaMeses && idClavePrograma == 2){
          Swal.fire({
            icon: 'warning',
            title: 'No se puede guardar!',
            text: 'Se necesita registar actividades para los 6 meses'
          })
        }else{
          SeminarioInvestigacion.guardarActividadesPosgrado(cloneActividadesList)
          .then((respuesta)=>{
            if(respuesta.message){
              Swal.fire({
                icon: 'success',
                title: 'Enhorabuena!',
                text: respuesta.message,
                confirmButtonText: 'Continuar',
                preConfirm: () =>{
                  router.push('/seminarios_investigacion/'+idSeminario);
                }
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Upss!',
                text: respuesta.errors
              })
            }
          })
        }
      }
    })
  }

  const guardarActividades = async () => {
    await SeminarioInvestigacion.guardarActividadesPosgrado(actividadesList)
    .then((respuesta)=>{
      if(respuesta.message){
        Swal.fire({
          icon: 'success',
          title: 'Enhorabuena!',
          text: respuesta.message,
          
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Upss!',
          text: respuesta.errors
        })
      }
    })
  }

  
  const solicitarDatosSeminarioInv = async () => {
    const actividadesSeminario = await SeminarioInvestigacion.getDatosEvaluacionSeminario(idSeminario)
    setActividadesList2(actividadesSeminario)
    let idEvaSeminarioInv = actividadesSeminario.datosSeminario.idSeminario;
    if(actividadesSeminario.estatus.id == 2){
      router.push("/seminarios_investigacion/"+idSeminario)
    }else{
      setActividadesList2((prev) => ({
        ...prev,
        estatus: 1,
        congresosEliminados: [],
        actividadesEliminadas: [],
        cursosExternosEliminados: [],
        estanciasEliminadas: [],
        publicacionesEliminadas: [],
        idEvaluacion: idEvaSeminarioInv
      }))

    }
  }
  useEffect( () =>{
    solicitarDatosSeminarioInv()
  },[])
  
  return (
    <Layout>
      <div className="container-fluid chapter page-icons">
        <div key="1" className="mb-3">
          <div className="box box-default">
            <div className="box-body">
              <div className="row">
                <Container maxWidth="xl"  style={{ paddingTop: '30px' }}>
                  <HeaderSection label="Evaluación de Seminario de Investigación" />
                  <Box
                    display="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ padding: '30px !important', backgroundColor: '#fff' }}
                    p={5}
                  >
                    {
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
                          datos.estatus && datos.estatus.id === 1 && (
                            <Instrucciones IdPrograma={1} />
                          )
                        }
                        <Pestanias { ...actividadesList} />
                        {
                          datos.estatus && datos.estatus.id === 1 && (
                            <Grid container spacing={2} item xs={12} sm={12} md={6} lg={6} xl={6}>
                              <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={` btn btn-success`}
                                  onClick={() => guardarActividades()}
                                  endIcon={<Save />}
                                >
                                  Guardar
                                </Button>
                              </Grid>
                              <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => enviarAFirma()}
                                  endIcon={<Send />}
                                >
                                  Firmar
                                </Button>
                              </Grid>
                              {
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
                  <br />
                  </Box>
                </Container>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Evaluacion;
