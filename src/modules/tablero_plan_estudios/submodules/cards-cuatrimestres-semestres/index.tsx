import { Alert, CircularProgress, Grid, Typography } from "@mui/material";
import {
  CardList,
  getDataCardCSFinalizado,
  getDataCardCSPendiente,
  getDataCardCSEnProceso
} from "@shared/components/cards";
import { useRecoilValue } from "recoil";
import { rolStateAtom } from "@modules/auth/recoil";
import Roles from "@definitions/Roles";
import { CSGql, SemestresCuatrimestresGql } from "@shared/types/cuatrimestresSemestresGql";
import { useState } from "react";
import { useQuery } from "react-query";
import apiInscripciones from "@shared/components/cards/apiInscripciones";

const CardsCS = (props:any) => {
  const [inscripcion, setInscripcion] = useState(false);
  const clickInscripcion = (txt:string) => {
    window.alert("texto: " + txt);
    setInscripcion(true);
  };
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const arrayCS:SemestresCuatrimestresGql = props.data;
  if(!arrayCS){
    return <></>;
  }
  return (
    <>
      <Grid container spacing={2} style={{padding:"10px 50px 0"}}>
        <Grid item xs={12}>
          <h3>Instrucciones</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{padding:"50px"}}>
        {(arrayCS?.EnProceso?.length > 0 || arrayCS?.Pendientes?.length > 0) &&
          <>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  <b>EN PROCESO Y POR INICIAR</b>
                </Typography>
              </Grid>
              {arrayCS?.EnProceso?.map((CS:CSGql, i) =>
                <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                  <CardList data={getDataCardCSEnProceso(CS, currentRol)} />
                </Grid>
              )}
              {arrayCS?.Pendientes?.map((CS:CSGql, i) =>
                <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                  <CardList data={getDataCardCSPendiente(CS, currentRol)} />
                </Grid>
              )}
          </>
        }
        {arrayCS?.Finalizados?.length > 0 &&
          <>
            <Grid item xs={12} style={(arrayCS?.EnProceso?.length > 0 || arrayCS?.Pendientes?.length > 0) ? {marginTop:"50px"} : {}}>
              <Typography variant="body1" gutterBottom>
                <b>FINALIZADOS</b>
              </Typography>
            </Grid>
            {arrayCS?.Finalizados?.map((CS:CSGql, i) =>
              <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                <CardList data={getDataCardCSFinalizado(CS, currentRol, clickInscripcion)} />
              </Grid>
            )}
          </>
        }
        {inscripcion &&
          <Inscribirse />
        }
      </Grid>
    </>
  );
};

/*const AlertDialog = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}*/

const Inscribirse = () => {
  const {
    data,
    error,
    isLoading,
  } = useQuery(
    'inscribirse-cuatrimestre-semestre',
    async () => await apiInscripciones.getPrueba(),
    {
      staleTime: Infinity,
    }
  );
  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Alert severity="error">
        false
      </Alert>
    );
  return (
    <Alert severity="success">
      true
    </Alert>
  );
};

export default CardsCS;
