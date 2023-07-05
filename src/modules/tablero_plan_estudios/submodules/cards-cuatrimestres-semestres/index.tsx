import {
  Alert,
  CircularProgress,
  Snackbar,
  Grid,
  Typography,
} from '@mui/material';
import {
  CardList,
  getDataCardCSFinalizado,
  getDataCardCSPendiente,
  getDataCardCSEnProceso,
} from '@shared/components/cards';
import { useRecoilValue } from 'recoil';
import { rolStateAtom, userStateAtom } from '@modules/auth/recoil';
import Roles from '@definitions/Roles';
import {
  CSGql,
  SemestresCuatrimestresGql,
} from '@shared/types/cuatrimestresSemestresGql';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import apiInscripciones from '@shared/components/cards/apiInscripciones';
import Modal from '../../../../shared/components/layouts/modal-inscripcion';
import { EcosurAuth } from '@modules/auth/definitions';
import { getCuatrimestresSemestres } from '@modules/tablero_plan_estudios/hooks';
import { useRouter } from 'next/router';

const CardsCS = (props: any) => {
  const data = props.data;
  const [inscripcion, setInscripcion] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [idBoleta, setIdBoleta] = useState();

  const router = useRouter();

  const handleOpenModal = idBoletasIncripciones => {
    setIdBoleta(idBoletasIncripciones);
    setIsOpen(true);
    setInscripcion(false);
  };
  const handleCloseModal = () => setIsOpen(false);
  const handleDataFromChild = data => {
    setInscripcion(data);
  };

  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const [listaCursos, setListaCursos] = useState(data);
  const arrayCS: SemestresCuatrimestresGql =
    getCuatrimestresSemestres(listaCursos);

    arrayCS?.Finalizados?.sort(function(a, b) {
      let fechaA = new Date(a.FechaFinPeriodo);
      let fechaB = new Date(b.FechaFinPeriodo);
      if (isNaN(fechaA.getTime()) || isNaN(fechaB.getTime())) {
        return 0; // Si alguna fecha es inválida, no se realiza el ordenamiento
      }
      return fechaB.getTime() - fechaA.getTime();
    });
  return (
    <>
      <Grid container spacing={2} style={{ padding: '10px 50px 0' }}>
        <Grid item xs={12}>
          <h3>Instrucciones</h3>
          <p style={{ textAlign: 'justify' }}>
            En esta sección se encuentran listados los periodos que conforman su
            plan de estudios. De acuerdo a su estatus, podrá inscribirse o
            descargar su boleta de inscripción.
          </p>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: '50px' }}>
        {(arrayCS?.EnProceso?.length > 0 ||
          arrayCS?.Pendientes?.length > 0) && (
          <>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <b>EN PROCESO Y POR INICIAR</b>
              </Typography>
            </Grid>
            {arrayCS?.EnProceso?.map((CS: CSGql, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <CardList
                  data={getDataCardCSEnProceso(CS, currentRol, handleOpenModal)}
                />
              </Grid>
            ))}
            {arrayCS?.Pendientes?.map((CS: CSGql, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <CardList
                  data={getDataCardCSPendiente(CS, currentRol, handleOpenModal)}
                />
              </Grid>
            ))}
          </>
        )}
        {arrayCS?.Finalizados?.length > 0 && (
          <>
            <Grid
              item
              xs={12}
              style={
                arrayCS?.EnProceso?.length > 0 ||
                arrayCS?.Pendientes?.length > 0
                  ? { marginTop: '50px' }
                  : {}
              }
            >
              <Typography variant="body1" gutterBottom>
                <b>FINALIZADOS</b>
              </Typography>
            </Grid>
            {arrayCS?.Finalizados?.map((CS: CSGql, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <CardList data={getDataCardCSFinalizado(CS, currentRol)} />
              </Grid>
            ))}
          </>
        )}
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          onData={handleDataFromChild}
          mensaje="¿Esta seguro/a de inscribirse al periodo?"
        />
        {/* {inscripcion && <p>Data from child: {inscripcion}</p>} */}
        {inscripcion && <Registration idBoletasIncripciones={idBoleta} />}
      </Grid>
    </>
  );
};

//incripción al estudiante al curso
const Registration = idBoletasIncripciones => {
  const router = useRouter();
  const idBoletas = idBoletasIncripciones.idBoletasIncripciones;
  //return <CircularProgress />;
  const { data, error, isLoading } = useQuery(
    'inscribirse-cuatrimestre-semestre',
    async () => await apiInscripciones.getInscripcionEstudiante(idBoletas),
    {
      staleTime: Infinity,
    }
  );

  const menssage = data?.message;
  if (isLoading)
    return (
      <Snackbar
        open={true}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CircularProgress />
      </Snackbar>
    );

  if (error) return <MessageAlert messageTxt={'Error'} severity={'error'} />;
  if (menssage.includes('Error')) {
    return <MessageAlert messageTxt={data?.message} severity={'warning'} />;
  } else {
    return <MessageAlert messageTxt={data?.message} severity={'success'} />;
  }
};
const MessageAlert = props => {
  const message = props.messageTxt;
  const txtSeverity = props.severity;
  return (
    <Snackbar
      open={true}
      autoHideDuration={1000}
      // onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={txtSeverity}>{message}</Alert>
    </Snackbar>
  );
};

export default CardsCS;
