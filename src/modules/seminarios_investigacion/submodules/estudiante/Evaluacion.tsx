import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
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

const meses = [1, 2, 3, 4, 5, 6];
const loadingIcon = size => (
  <CircularProgress variant="indeterminate" color="inherit" size={size} />
);

const Evaluacion = props => {
  const idSeminario = props.idseminario;

  console.log(idSeminario);
  //FIXME: IOG obtener los datos del estudiante

  //const datosGuardar = useStore().getState().seminarios.datosGuardar;
  const guardarTemporal = null;
  const enviarEvaluacion = null;
  const datosActividades = null;
  /*
  const hayActividades = () => {
    if (!datosActividades) {
      return false;
    }
    let fa = {
      f1: false,
      f2: false,
      f3: false,
      f4: false,
      f5: false,
      f6: false,
    };
    meses.forEach(mes => {
      datosActividades.forEach(item => {
        if (item.meses.includes(mes)) {
          fa[`f${mes}`] = true;
          return;
        }
      });
    });
    return fa.f1 && fa.f2 && fa.f3 && fa.f4 && fa.f5 && fa.f6;
  };*/
  /*
  const activadoSinActividades = () => {
    if (datosGuardar.tieneCongresos && props.datosCongreso.length === 0) {
      const MessageSinCongresos = () => (
        <span
          dangerouslySetInnerHTML={{
            __html:
              'Registre al menos un congreso o active la opción <b>No participé en congresos</b>',
          }}
        />
      );
      notificaciones.activarSinActividades(MessageSinCongresos);
      return false;
    }
    if (datosGuardar.tieneEstancias && props.datosEstancias.length === 0) {
      const MessageSinEstancias = () => (
        <span
          dangerouslySetInnerHTML={{
            __html:
              'Registre al menos una estancia o active la opción <b>No realicé estancias</b>',
          }}
        />
      );
      notificaciones.activarSinActividades(MessageSinEstancias);
      return false;
    }
    if (datosGuardar.tieneCursos && props.datosCursosExternos.length === 0) {
      const MessageSinCursos = () => (
        <span
          dangerouslySetInnerHTML={{
            __html:
              'Registre al menos un curso o active la opción <b>No tomé cursos externos</b>',
          }}
        />
      );
      notificaciones.activarSinActividades(MessageSinCursos);
      return false;
    }
    if (
      datosGuardar.tienePublicaciones &&
      props.datosPublicaciones.length === 0
    ) {
      const MessageSinPublicaciones = () => (
        <span
          dangerouslySetInnerHTML={{
            __html:
              'Registre al menos una publicación o active la opción <b>No realicé publicaciones</b>',
          }}
        />
      );
      notificaciones.activarSinActividades(MessageSinPublicaciones);
      return false;
    }
    return true;
  };
*/
  /*
  const guardarTemporal = () => {
    if (activadoSinActividades()) {
      dispatch(guardarTemporalSeminario(datosGuardar, idSeminario));
    }
  };


  const enviarEvaluacion = () => {
    if (activadoSinActividades()) {
      if (user.IdPrograma === '2') {
        let actividades = hayActividades(datosActividades);
        if (!actividades) {
          notificaciones.registrarActividades();
          return;
        } else {
          dispatch(guardarFinalizarSeminario(datosGuardar, idSeminario));
        }
      } else {
        dispatch(guardarFinalizarSeminario(datosGuardar, idSeminario));
      }
    }
  };

  useEffect(() => {
     dispatch(cargarDatosSeminario(idSeminario));
  }, [idSeminario]);
*/

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

                      <Pestanias {...datos} />
                      {
                        //Pintamos los botones de guardar solo si el estatus es 1
                        datos.estatus && datos.estatus.id === 1 && (
                          <Grid item xs={12} className={` mt-3`}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={` btn btn-success`}
                              onClick={() => guardarTemporal()}
                              endIcon={<Save />}
                            >
                              Guardar
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => enviarEvaluacion()}
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
