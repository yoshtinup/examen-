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
      <b>{label}</b>
    </Typography>
    <Typography display="inline">{value}</Typography>
  </div>
);

export const ExternoContentCard: React.FC<AsesorExterno> = props => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Label label="Email:" value={props.email} />
        <Label label="Grado:" value={props.grado} />
      </Stack>
      <Label label="Institucion:" value={props.institucion} />
      <Label label="Argumentacion:" value={props.argumentacion} />
      {props.idParticipacion == 33 && (
        <>
          <Label label="SNI:" value={props.codirectorInfo?.sNI} />
          <Stack direction="row" spacing={2}>
            <Label
              label="Num Pub Arb:"
              value={props.codirectorInfo?.numPubArb}
            />
            <Label
              label="Num Est Maestria:"
              value={props.codirectorInfo?.numEstMaestria}
            />
            <Label
              label="Num Est Doc:"
              value={props.codirectorInfo?.numEstDoc}
            />
          </Stack>
        </>
      )}
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
  return (
    <CardContent>
      <Grid container>
        <Grid item xs={11}>
          <Label
            label="Nombre:"
            value={`${nombre} ${apellidoPaterno} ${apellidoMaterno}`}
          />
          <Label
            label="Participacion:"
            value={idParticipacion == 33 ? 'Codirector' : 'Asesor'}
          />
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
