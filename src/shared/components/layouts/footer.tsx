import { FC } from "react";
import { Grid, Box, Container } from '@mui/material';
import { CSSProperties } from "styled-components";

type FooterProps = {
  open: Boolean;
};

export const Footer: FC<FooterProps> = ({open}) => {
  return (
    <Box 
      sx={{
        backgroundColor: 'white',
        boxShadow: '0 0 5px',
        padding: '10px 0',
        position: 'absolute',
        left: {
          lg: open ? 280 : 85,
        },
        width: {
          lg: open ? 'calc(100% - 280px)' : 'calc(100% - 85px)',
          xs: '100%'
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={6} lg={8} sm={8}>
            <p style={{ color: '#6a6a6a' }}>
              <b>Soporte técnico:</b> notificaciones.posgrado@ecosur.mx.{' '}
              <b>Tel.</b> 967 67 49000 <b>Ext.</b> 1771 y 1772
            </p>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
