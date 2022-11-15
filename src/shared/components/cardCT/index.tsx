// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { Box, CardMedia, Grid } from '@mui/material';
import { NewGridProfile } from './newGrid';

export type EcosurProfileCardProps = {
  data: object;
  img?: string;
  width?: number | string;
  height?: number | string;
  sizeRow?: number | string;
  color?: string;
  textColor?: string;
  titleColor?: string;
};

const EcosurProfileCard = ({
  data = {},
  img = undefined,
  width = 'auto',
  height = '100%',
  sizeRow = undefined,
  color = 'background.default',
  textColor = 'text.secondary',
  titleColor = 'text.primary',
}: EcosurProfileCardProps) => {
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
        {img ? (
          <Grid item justifyContent='center' alignItems='center' bgcolor={color}>
            <CardMedia
              component='img'
              image={img}
              alt='Foto'
              sx={{ width: 120, height: 120, margin: 'auto' }}
            />
          </Grid>
        ) : (
          ''
        )}
        <Grid item sm sx={{ p: 2 }}>
          <Grid
            container
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
            bgcolor={color}
          >
            <NewGridProfile
              data={data}
              startIndex={0}
              finalIndex={sizeRowSelected}
              textColor={textColor}
              titleColor={titleColor}
            />
            {!(sizeRowSelected == Object.keys(data).length)
              ? addNewGrid(data, sizeRowSelected, Object.keys(data).length, textColor, titleColor)
              : ''}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}; // ProfileCard

const addNewGrid = (
  data: object,
  startIndex: number,
  finalIndex: number,
  textColor: string,
  titleColor: string,
) => {
  return (
    <NewGridProfile
      data={data}
      startIndex={startIndex}
      finalIndex={finalIndex}
      textColor={textColor}
      titleColor={titleColor}
    />
  );
}; // addnewGrid

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

export default EcosurProfileCard;
