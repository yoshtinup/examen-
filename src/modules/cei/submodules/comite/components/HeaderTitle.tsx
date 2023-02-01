import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type TitleProps = {
  label: string
  elevation?: number
}

/**
 * Genera el compnente de titulo para los elementos que lo necesiten
 * @param
 * @returns
 */
const HeaderTitle: React.FC<TitleProps>  = ({label, elevation=4}) => {
  return (
    <Paper sx={{
			padding: 1,
      bgcolor: 'secondary.main',
      color: 'primary.contrastText',
      borderRadius: 0
    }} elevation={elevation} >
      <Typography component='div' variant="h6" >{label}</Typography>
    </Paper>
  );
};
export default HeaderTitle
