import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Grid } from '@mui/material';

const EstatusProcesoCT: React.FC<{ estatus: string }> = ({
  estatus,
}) => {

  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Chip
            icon={<Diversity3Icon />}
            label={`Estatus: ${estatus}`}
            style={{
              border: '1px solid #d1d6d8',
              color: '#000',
              fontWeight: 'bold',
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
export default EstatusProcesoCT;
