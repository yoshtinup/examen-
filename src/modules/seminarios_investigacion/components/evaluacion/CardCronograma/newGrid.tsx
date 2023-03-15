// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';

import { Programaactividades } from '../../../types';
import { Box, Grid, Typography } from '@mui/material';
import { AdjustOutlined } from '@mui/icons-material';

type Color = {
  textColor: string;
  titleColor: string;
  bgBox: string
};

interface NewGridCronogramaProps extends Color {
  startIndex: number;
  finalIndex: number;
  data: Array<Programaactividades>;
} // NewGridProfileProps

export const NewGridCronograma = ({
  data = [],
  startIndex = 0,
  finalIndex = 0,
  textColor = '',
  titleColor = '',
  bgBox = '',
}: NewGridCronogramaProps) => {
  let mesesCantidad = 0;
  data.map(actividad => {
    actividad.actividad = actividad.actividad;
    actividad.meses = actividad.meses.toString().split(",");
    actividad.meses.map(mes => {
      (parseInt(mes) > mesesCantidad) ? mesesCantidad = parseInt(mes) : '';
    })
  })

  const renderHeader = () => {
    let header = [];
    header.push(
      <Grid  item xs={30} key={`ecosur-cronograma-card-actividad`} sx={{ display: 'flex', flexDirection: 'colum', textAlign: "center", bgcolor: 'background.default', justifyContent: 'center', alignItems: 'center' }}>
        <Typography component='div' variant='body2' color='text.primary' sx={{ p: 0, m: 0, fontWeight: 'bold', 
            fontSize: {
            xs: '60%',
            sm: '60%',
            md: '80%',
          } 
        }}>
          <p>Actividad</p>
        </Typography>
      </Grid>
    );
    for (let index = 0; index < mesesCantidad; index++) {
      header.push(
        <Grid key={`ecosur-cronograma-card-${index}`} container sx={{ display: 'flex', flexDirection: 'colum', textAlign: "center", bgcolor: 'background.default', justifyContent: 'center', alignItems: 'center' }}>
          <Typography component='div' variant='body2' color='text.primary' sx={{ fontWeight: 'bold', 
              fontSize: {
                xs: '60%',
                sm: '60%',
                md: '80%',
            } 
          }}>
            <p>Mes {index+1}</p>
          </Typography>
        </Grid>
      );
    }
    return header;
  }
  
  const mesValidation = (data: any) => {
    let meses = [];
    meses.push(
      <Grid item xs={30} key={`ecosur-cronograma-card-actividad`} sx={{ display: 'flex', flexDirection: 'colum', textAlign: "center", border: 1, borderColor: 'background.default', justifyContent: 'center' }}>
        <Grid item key={`ecosur-cronograma-card-actividad1`} sx={{ display: 'flex', flexDirection: 'colum', textAlign: "center", justifyContent: 'center', alignItems: 'center' }}>
          <Typography component='div' variant='body2' color='text.secondary' sx={{
            fontSize: {
              xs: '60%',
              sm: '75%',
              md: '75%',
            } 
          }}>
            {data.actividad}
          </Typography> 
        </Grid>
      </Grid>
    );
    for (let index = 0; index < mesesCantidad; index++) {
      meses.push(
        <Grid key={`ecosur-cronograma-card-${index+1}`} container sx={{ display: 'flex', flexDirection: 'colum', textAlign: "center", border: 1, borderColor: 'background.default', justifyContent: 'center' }}>
          {
            data.meses.map((mes: string) => (
              (parseInt(mes) == (index+1)) ?
                <Grid key={`ecosur-cronograma-card-${index+1}`} container sx={{ bgcolor: 'primary.main' }}>
                </Grid>
                : ''
            ))
          }
        </Grid>
      );
    }
    return meses;
  }
  return (
    <Grid item>
      <Box alignItems='center'>
        <Box>
            <Grid container sx={{ display: 'flex', flexDirection: 'column'  }}>
              <Grid item xs={12} sx={{ textAlign: "center", display: 'flex', flexDirection: 'row' }}>
                { renderHeader() }  
              </Grid>
              {
                data.map((actividad, index: number) => (
                  <Grid key={`ecosur-cronograma-mes-card-${index}`} item xs={12}  sx={{ textAlign: "center", display: 'flex', flexDirection: 'row' }}>
                    { mesValidation(actividad) }  
                  </Grid>
                ))
              }
            </Grid>
        </Box>           
      </Box>
    </Grid>
  );
}; // NewGridProfile
