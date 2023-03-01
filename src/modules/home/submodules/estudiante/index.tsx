import TableroPlanEstudios from "@modules/tablero_plan_estudios";
import { Grid, Typography } from "@mui/material";

const Estudiante = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          <b>HOME ESTUDIANTE.</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableroPlanEstudios />
      </Grid>
    </Grid>
  );
};
export default Estudiante;
