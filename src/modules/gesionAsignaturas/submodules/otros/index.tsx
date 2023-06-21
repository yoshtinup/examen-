import { Container, Grid, Typography } from "@mui/material";

const style = {
  padding: '30px',
  backgroundColor:"#fff"
}

const Otros = () => {
  return (
    <Container maxWidth={false} style={{...style}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            <b>Otros.</b>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Otros;
