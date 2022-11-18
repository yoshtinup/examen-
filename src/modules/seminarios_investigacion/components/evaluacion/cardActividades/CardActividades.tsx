// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { Box, CardMedia, Grid } from '@mui/material';
import { NewGridActividades } from './newGrid';
import { ActividadInfo } from '../../../types';

export type EcosurActividadCardProps = {
  data: Array<ActividadInfo>;
  width?: number | string;
  height?: number | string;
  sizeRow?: number | string;
  bgBox?: string;
  color?: string;
  textColor?: string;
  titleColor?: string;
};

const EcosurActividadCard = ({
  data = [],
  width = 'auto',
  height = '100%',
  sizeRow = 'all',
  color = 'background.default',
  textColor = 'text.secondary',
  titleColor = 'primary',
  bgBox = 'background.default',
}: EcosurActividadCardProps) => {
  let sizeRowSelected = 0;
  try {
    sizeRowSelected = sizeRowFunction(sizeRow, data);
  } catch (e) {
    console.error(e);
  }
  return (
    <Box
      sx={{
        margin: 'auto',
        maxWidth: width,
        maxHeight: height,
        flexGrow: 0,
      }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='top'
        bgcolor={color}
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
          },
        }}
      >
        <Grid item sm sx={{ p: 2 }}>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
            bgcolor={color}
          >
            <NewGridActividades
              data={data}
              startIndex={0}
              finalIndex={sizeRowSelected}
              textColor={textColor}
              titleColor={titleColor} 
              bgBox={bgBox}            
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}; // EcosurActividadCard

const sizeRowFunction = (sizeRow: number | string | undefined, data: object): number => {
  let sizeRowSelected = 0;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  let errorMessage: string = '';

  if (typeof sizeRow == 'string') {
    if (sizeRow == 'all') {
      sizeRowSelected = Object.keys(data).length;
    } else {
      errorMessage = 'The ' + { sizeRow } + ' value is not valid.';
    }
  } else if (typeof sizeRow == 'number') {
    if (sizeRow != 0 && sizeRow <= Object.keys(data).length) {
      sizeRowSelected = sizeRow;
    } else {
      errorMessage = 'The number ' + { sizeRow } + ' is not valid.';
    }
  } else if (typeof sizeRow == 'undefined') {
    if (Object.keys(data).length >= 8) {
      sizeRowSelected = Math.round(Object.keys(data).length / 2);
    } else {
      sizeRowSelected = Object.keys(data).length;
    }
  } else {
    errorMessage = 'Invalid sizeRow value.';
  } // if-else

  if (errorMessage.length <= 0) {
    return sizeRowSelected;
  } else {
    throw new Error(errorMessage);
  } // if-else
}; // sizeRowFunction

export default EcosurActividadCard;
