import { Container, Grid, Typography } from "@mui/material";

const style = {
  padding: '30px',
  backgroundColor:"#fff"
}

const ServiciosEscolares = () => {
  return (
    <Container maxWidth={false} style={{...style}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            <b>HOME SERVICIOS ESCOLARES.</b>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ServiciosEscolares;
