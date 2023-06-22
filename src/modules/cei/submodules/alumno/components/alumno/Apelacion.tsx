import { Paper, Typography } from '@mui/material';
import React from 'react';
import HeaderTitle from '../HeaderTitle';

const Apelacion: React.FC<{ apelacion: string }> = ({ apelacion }) => {
  return (
    <>
      <br></br>
      <HeaderTitle label={'Apelacion'} />
      <Paper key={`form-apelacion`} elevation={4} sx={{ padding: 2, mb: 3 }}>
        <Typography variant="body1">{apelacion}</Typography>
      </Paper>
    </>
  );
};
export default Apelacion;
