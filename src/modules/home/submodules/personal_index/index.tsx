import { Container, Grid, Typography } from "@mui/material";

const style = {
  padding: '30px',
  backgroundColor:"#fff"
}

const Personal = () => {
  return (
    <Container maxWidth={false} style={{...style}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            <b>HOME PERSONAL.</b>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Personal;
