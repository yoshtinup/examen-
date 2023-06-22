import React from 'react';
import { Grid, Typography } from '@mui/material';
import { texto } from './TextoInterfaces';

export default ({ IdPrograma }) => (
  <>
    <Grid item xs={12}>
      <Typography variant="subtitle2">
        <b>{texto.instrucciones.encabezado}</b>
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body2">{texto.instrucciones.descripcion}</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography
        variant="body2"
        component="span"
        dangerouslySetInnerHTML={{ __html: texto.instrucciones.pasos }}
      />
    </Grid>
    {IdPrograma === '2' && (
      <Grid item xs={12}>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: texto.instrucciones.nota }}
        />
      </Grid>
    )}
  </>
);
