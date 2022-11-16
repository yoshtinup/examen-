import * as React from 'react';
/* import { PersonalAcademico } from '@modules/consejo_tutelar/types'; */
import {
  PersonalAcademico,
  AsesorExterno,
} from '@modules/consejo_tutelar/types';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const Label: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div>
    <Typography display="inline" sx={{ mr: 1 }}>
      {label}
    </Typography>
    <Typography display="inline" style={{ color: '#4a4a4a' }}>
      {value}
    </Typography>
  </div>
);

export const ExternoContentCard: React.FC<AsesorExterno> = props => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Label label="Email:" value={props.email} />
        <Label label="Grado:" value={props.grado} />
        {props.idParticipacion == 33 && (
          <Label label="Nivel SNI:" value={props.codirectorInfo?.sNI} />
        )}
      </Stack>
      <Label label="Institución de adscripción:" value={props.institucion} />
      {props.idParticipacion == 33 && (
        <>
          <Stack direction="row" spacing={2}>
            <Label
              label="Número de publicaciones arbitradas:"
              value={props.codirectorInfo?.numPubArb}
            />
            <Label
              label="Número de estudiantes de maestría graduados:"
              value={props.codirectorInfo?.numEstMaestria}
            />
            <Label
              label="Número de estudiantes de doctorado graduados:"
              value={props.codirectorInfo?.numEstDoc}
            />
          </Stack>
        </>
      )}
      <Label label="Argumentación:" value={props.argumentacion} />
      <Label label="Curriculum Vitae:" value={props.fileName} />
    </>
  );
};

interface IntegranteCTContentCardProps {
  index: number;
  disabled: boolean;
  idParticipacion: number;
  tipo: 'interno' | 'externo';
  onRemoveItem: (index: number, tipo: 'interno' | 'externo') => void;
}

export const IntegranteCTContentCard: React.FC<
  React.PropsWithChildren<PersonalAcademico & IntegranteCTContentCardProps>
> = props => {
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    index,
    disabled,
    idParticipacion,
    tipo,
    onRemoveItem,
    children,
  } = props;

  const tipoParticipacion = idParticipacion == 33 ? 'Codirector' : 'Asesor';
  return (
    <CardContent>
      <Grid container style={{ backgroundColor: '#f3f5f7', padding: '15px' }}>
        <Grid item xs={11}>
          <Typography display="inline" sx={{ mr: 1 }}>
            <span
              style={{ fontSize: '17px', fontWeight: 'bold' }}
            >{`${nombre} ${apellidoPaterno} ${apellidoMaterno}`}</span>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 'lighter',
                color: '#4a4a4a',
              }}
            >
              {'   '}({tipoParticipacion})
            </span>
          </Typography>

          <p
            style={{
              fontSize: '12px',
              color: '#3a3a3a',
              fontWeight: 'bold',
              paddingLeft: '10px',
              marginTop: '0px',
            }}
          >
            {`Integrante de CT ${tipo}`}
          </p>

          {children}
        </Grid>
        <Grid item xs={1}>
          <IconButton
            disabled={disabled}
            color="error"
            aria-label="Delete"
            onClick={() => onRemoveItem(index, tipo)}
          >
            <Delete fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </CardContent>
  );
};
