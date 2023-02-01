import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type InfoBoxProps = {
 label: string
}

// Caja informativa
const InfoBox: React.FC<InfoBoxProps>  = ({label}) => {
  return (
    <Box sx={{
      display: 'flex',
      backgroundColor: 'success.main',
      color: '#f2f2f2',
      height: '80px',
      width: '100px',
      padding: '10px',
      textAlign: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }} >
        <Typography component="div" variant="h6" >{label}</Typography>
    </Box>
  );
};
export default InfoBox
