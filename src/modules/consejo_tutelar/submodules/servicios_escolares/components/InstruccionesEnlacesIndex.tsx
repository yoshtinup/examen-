import { Grid } from '@mui/material';

const enlacesImportantes = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <h3>Instrucciones</h3>
        <p>
          En estas interfaces podrá dar seguimiento al proceso de conformación
          de consejo tutelar de estudiantes de Posgrado. Por defecto se cargan
          las conformaciones de los estudiantes del año en curso, si requiere
          consultar años anteriores selecciónelo en el campo “Año de proceso”.
        </p>
        <p>
          Los estudiantes se presentan en dos pestañas En proceso: estudiantes
          que están en proceso de evaluación Concluidos: estudiantes que ya
          concluyeron el proceso
        </p>
      </Grid>
    </Grid>
  );
};

export default enlacesImportantes;
