import { Grid } from '@mui/material';

const enlacesImportantes = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <h3>Instrucciones</h3>
        <p>
          En estas interfaces podrá dar seguimiento al proceso de conformación
          de consejo tutelar de estudiantes de Posgrado.
        </p>
        <p>
          Los estudiantes se presentan en dos pestañas
          <ul>
            <li>
              En proceso: estudiantes que están en proceso de evaluación, en
              ellas puede enviar recordatorios de acuerdo con el estatus que se
              encuentre el proceso de conformación, generar las cartas de
              aceptación y eliminar a integrantes del CT.
            </li>
            <li>Concluidos: estudiantes que ya concluyeron el proceso.</li>
          </ul>
        </p>
      </Grid>
    </Grid>
  );
};

export default enlacesImportantes;
