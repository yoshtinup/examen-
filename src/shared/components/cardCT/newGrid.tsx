// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';

import { Box, Grid, Typography } from '@mui/material';

type Color = {
  textColor: string;
  titleColor: string;
};

interface NewGridProfileProps extends Color {
  /**
          Imágen que se mostrará en la card (opcional)
      */
  startIndex: number;
  /**
          Título que se mostrará en la parte superior de la card (opcional)
      */
  finalIndex: number;
  /**
          Lista de datos que se mostrarán en la card
      */
  data: object;
} // NewGridProfileProps

interface PropiedadesProps extends Color {
  propertyKey: string;
  value: number | string | boolean | null;
}

const Propiedad: React.FC<PropiedadesProps> = ({ propertyKey, value, textColor, titleColor }) => {
  const valueAsString = `${value}`;
  return (
    <>
      {value !== null && valueAsString !== ' ' && valueAsString !== '' && (
        <Box sx={{ display: 'flex', flexDirection: 'row' }} alignItems='center'>
          <Typography variant='body1' display='inline' color={titleColor} sx={{ ml: 2 }}>
            <b>{capitalizeFirstLetter(propertyKey)}:</b>
          </Typography>
          <Typography variant='body1' display='inline' sx={{ ml: 1 }} color={textColor}>
            {`${value}`}
          </Typography>
        </Box>
      )}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NewGridProfile = ({
  data = {},
  startIndex = 0,
  finalIndex = 0,
  textColor = '',
  titleColor = '',
}: NewGridProfileProps) => {
  return (
    <Grid item>
      {Object.entries(data)
        .slice(startIndex, finalIndex)
        .map(([key, value], index) => (
          <Propiedad
            propertyKey={key}
            key={`ecosur-profile-card-${key.replace(' ', '')}-${index}`}
            value={value}
            textColor={textColor}
            titleColor={titleColor}
          />
        ))}
    </Grid>
  );
}; // NewGridProfile

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}; // capitalizeFirstLetter
