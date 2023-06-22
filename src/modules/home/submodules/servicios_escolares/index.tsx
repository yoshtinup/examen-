import TableroServiciosEscolares from "@modules/tablero_servicios_escolares";
import { Button, Container, Grid, Typography } from "@mui/material";
import { HeaderSection } from "@shared/components";
import Router from 'next/router';
const style = {
  padding: '30px',
  backgroundColor:"#fff"
}
function handleClick() {
  window.open('/home?matricula=202261013', '_blank')
}

const ServiciosEscolares = () => {
  return (
    <Container maxWidth={false} style={{...style}}>
     
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {/* <b>HOME SERVICIOS ESCOLARES.</b> */}
          
          {/* <Button variant="contained" onClick={handleClick}>
          Continuar
          </Button> */}
          <TableroServiciosEscolares/>
          
          </Typography>
          
        </Grid> 
      </Grid>
    </Container>
  );
};
export default ServiciosEscolares;
 