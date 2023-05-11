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
  getDataCardCSEnProceso
} from "@shared/components/cards";
import { useRecoilValue } from "recoil";
import { rolStateAtom, userStateAtom } from "@modules/auth/recoil";
import Roles from "@definitions/Roles";
import { CSGql, SemestresCuatrimestresGql } from "@shared/types/cuatrimestresSemestresGql";
import React, { useState } from "react";
import { useQuery } from "react-query";
import apiInscripciones from "@shared/components/cards/apiInscripciones";
import Modal from "./modal-inscripcion-cuatri";
import { EcosurAuth } from "@modules/auth/definitions";
import { useGetCursosAlumno } from "@shared/queries";
import { getCuatrimestresSemestres } from "@modules/tablero_plan_estudios/hooks";
import { useRouter } from 'next/router';

const CardsCS = (props:any) => {
  const data = props.data;
  const [inscripcion, setInscripcion] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [idBoleta, setIdBoleta] = useState();

  const router = useRouter();
  // useEffect(() => {
  //   // Lógica para recargar la sección aquí
  //   router.reload();
  // }, [Registration]);

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
  const arrayCS:SemestresCuatrimestresGql = getCuatrimestresSemestres(listaCursos);
  return (
    <>
      <Grid container spacing={2} style={{ padding: '10px 50px 0' }}>
        <Grid item xs={12}>
          <h3>Instrucciones</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
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
  console.log(idBoletas);
  //return <CircularProgress />;
  const { data, error, isLoading } = useQuery(
    'inscribirse-cuatrimestre-semestre',
    async () => await apiInscripciones.getInscripcionEstudiante(idBoletas),
    {
      staleTime: Infinity,
    }
  );

  const menssage = data?.message;
  console.log(isLoading);
  if (isLoading)
    return (
      <Snackbar
        open={true}
        autoHideDuration={1000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CircularProgress />
      </Snackbar>
    );

  if (error)
    return (
      <Snackbar
        open={true}
        autoHideDuration={1000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error">false</Alert>
      </Snackbar>
    );
  if (menssage.includes('Error')) {
    return (
      <Snackbar
        open={true}
        autoHideDuration={1000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="warning">{data?.message}</Alert>
      </Snackbar>
    );
  } else {
    return (
      <Snackbar
        open={true}
        autoHideDuration={1000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success">{data?.message}</Alert>
      </Snackbar>
    );
  }
};

export default CardsCS;
