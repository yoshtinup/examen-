import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import HeaderTitle from '../HeaderTitle';
import { SugerenciaItemProps } from '@moduleCEIAlumnos/__generated__/globalTypes';

type SugerenciasProps = {
  sugerencias?: Array<SugerenciaItemProps>;
};

const uuid = uuidv4();
/**
 * Genera las tarjetas de sugerencias dadas por los evaluadores
 * @param
 * @returns
 */
const Sugerencias: React.FC<SugerenciasProps> = ({ sugerencias }) => {
  const generateSugerenciaItems = () => {
    return sugerencias?.map((sugerencia: any) => (
      <Paper
        key={`form-sugerencias-${uuid}`}
        elevation={4}
        sx={{ padding: 2, mb: 3 }}
      >
        <Typography variant="button" sx={{ fontWeight: 'bold' }}>
          {sugerencia.date}
        </Typography>
        <Typography variant="body1">{sugerencia.text}</Typography>
      </Paper>
    ));
  };
  return (
    <React.Fragment key={`form-header-sugerencias-${uuid}`}>
      <HeaderTitle label={'Sugerencias'} />
      {generateSugerenciaItems()}
    </React.Fragment>
  );
};
export default Sugerencias;
// document.querySelectorAll(" p * div ")
