import React from 'react';

import {
  Container,
  Stack,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  EvaluacionComite,
  IntegranteCT,
  EstatusIndividual,
} from '@modules/consejo_tutelar/types';
import { EcosurSectionTitle } from '@shared/components';
import { EcosurProfileCard, EcosurCommentsCard } from 'ecosur-ui';
import { Perfil } from '../components';

const integrantes: IntegranteCT[] = [
  {
    idTutorSinodal: 100,
    nombre: 'Diego',
    unidad: 'Sancristobal',
    grado: 'Dr',
    gradoGeneral: 'Doctorado',
    correo: 'apoyo@ecosur.com',
    idParticipacion: 2,
    participacion: 'Doctorado',
    url: 'htttp',
    insitucion: 'Mock',
    argumentacion: 'Por que quice',
    estatusGeneral: '',
    tipoAcademico: 'Interno',
    evaluadoPorGP: false,
    evaluadoPorRO: false,
    evaluadoPorCUP: false,
    estatusIndividual: [
      {
        nombre: 'Diego Cruz Aguilar',
        estatus: 'Rechazado',
        rol: 'Responsable de orientacion',
        fecha: '9/21/2021',
        motivoRechazo: 'Por que quice',
      },
      {
        nombre: 'Diego Cruz Aguilar',
        estatus: 'Rechazado',
        rol: 'Responsable de orientacion',
        fecha: '9/21/2021',
        motivoRechazo: 'Por que quice',
      },
      {
        nombre: 'Diego Cruz Aguilar',
        estatus: 'Rechazado',
        rol: 'Responsable de orientacion',
        fecha: '9/21/2021',
        motivoRechazo: 'Por que quice',
      },
    ],
    datosCodirector: null,
  },
  {
    idTutorSinodal: 101,
    nombre: 'Diego',
    unidad: 'Sancristobal',
    grado: 'Dr',
    gradoGeneral: 'Doctorado',
    correo: 'apoyo@ecosur.com',
    idParticipacion: 2,
    participacion: 'Doctorado',
    url: 'htttp',
    insitucion: 'Mock',
    argumentacion: 'Por que quice',
    estatusGeneral: '',
    tipoAcademico: 'Externo',
    evaluadoPorGP: false,
    evaluadoPorRO: false,
    evaluadoPorCUP: false,
    estatusIndividual: [
      {
        nombre: 'Diego Cruz Aguilar',
        estatus: 'Rechazado',
        rol: 'Responsable de orientacion',
        fecha: '9/21/2021',
        motivoRechazo: 'Por que quice',
      },
      {
        nombre: 'Diego Cruz Aguilar',
        estatus: 'Rechazado',
        rol: 'Responsable de orientacion',
        fecha: '9/21/2021',
        motivoRechazo: 'Por que quice',
      },
      {
        nombre: 'Diego Cruz Aguilar',
        estatus: 'Rechazado',
        rol: 'Responsable de orientacion',
        fecha: '9/21/2021',
        motivoRechazo: 'Por que quice',
      },
    ],
    datosCodirector: {
      sNI: 'Candidato',
      numPubArb: 2,
      numEstMaestria: 2,
      numEstDoc: 2,
    },
  },
];

const Comentario: React.FC<{ statusIndividuals: EstatusIndividual[] }> = ({
  statusIndividuals,
}) => {
  const data = statusIndividuals.map(status => ({
    foto: 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png',
    nombre: status.nombre,
    cargo: status.rol,
    evaluacion: status.estatus,
    fecha: status.fecha,
    comentario: status.motivoRechazo,
  }));
  return <EcosurCommentsCard id="ecosur-comentarios-ct" data={data} />;
};

type IntegranteEvaluacionProps = {
  data: IntegranteCT;
  setEvaluacion: (evaluacion: EvaluacionComite) => void;
};
const IntegranteEvaluacion: React.FC<IntegranteEvaluacionProps> = ({
  data,
  setEvaluacion,
}) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const info = {
    unidad: data.unidad,
    'grado General': data.gradoGeneral,
    correo: data.correo,
    participacion: data.participacion,
    insitucion: data.insitucion,
    argumentacion: data.argumentacion,
    'tipo Academico': data.tipoAcademico,
    sNI: data.datosCodirector?.sNI,
    numPubArb: data.datosCodirector?.numPubArb,
    numEstMaestria: data.datosCodirector?.numEstMaestria,
    numEstDoc: data.datosCodirector?.numEstDoc,
  };

  const handleClick = () => {
    setDisabled(true);
    setEvaluacion({
      id: data.idTutorSinodal,
      aprobo: false,
      comentario: 'Hola mundo',
    });
  };
  return (
    <Card variant="outlined">
      <CardHeader title={`${data.grado} ${data.nombre}`} />
      <CardContent>
        <EcosurProfileCard data={info} />
        <Comentario statusIndividuals={data.estatusIndividual} />
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          disabled={disabled}
          onClick={handleClick}
          variant="contained"
          size="small"
        >
          No aprobar
        </Button>
      </CardActions>
    </Card>
  );
};

type SeccionEvaluacionProps = {
  title: string;
  integrantes: IntegranteCT[];
  setEvaluacion: (evaluacion: EvaluacionComite) => void;
};
const SeccionEvaluacion: React.FC<SeccionEvaluacionProps> = ({
  title,
  integrantes,
  setEvaluacion,
}) => (
  <div>
    <EcosurSectionTitle label={title} variant="h6" bgcolor="secondary" />
    {integrantes.map(integrante => (
      <IntegranteEvaluacion
        setEvaluacion={setEvaluacion}
        key={`integrante-evaluacion-${integrante.idTutorSinodal}`}
        data={integrante}
      />
    ))}
  </div>
);

const Comite = () => {
  const aprobarAll: EvaluacionComite[] = integrantes.map(integrante => {
    return {
      id: integrante.idTutorSinodal,
      aprobo: true,
      comentario: null,
    };
  });
  const [evaluaciones, setEvaluacion] =
    React.useState<EvaluacionComite[]>(aprobarAll);
  const handleSetEvaluacion = (evaluacion: EvaluacionComite) => {
    const restEvaluaciones: EvaluacionComite[] = evaluaciones.filter(
      e => e.id != evaluacion.id
    );
    setEvaluacion([...restEvaluaciones, evaluacion]);
  };
  const handleClick = () => {
    console.log(evaluaciones);
  };
  const internos = integrantes.filter(
    integrante => integrante.tipoAcademico === 'Interno'
  );
  const externos = integrantes.filter(
    integrante => integrante.tipoAcademico !== 'Interno'
  );
  return (
    <Container maxWidth="md">
      <Stack spacing={4}>
        {/* FIXME: @iocampo Incluir instrucciones */}
        <Perfil />
        <SeccionEvaluacion
          title="Integrantes Internos"
          integrantes={internos}
          setEvaluacion={handleSetEvaluacion}
        />
        <SeccionEvaluacion
          title="Integrantes externos"
          integrantes={externos}
          setEvaluacion={handleSetEvaluacion}
        />
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          sx={{ width: 200 }}
        >
          Guardar evaluacion
        </Button>
      </Stack>
    </Container>
  );
};
export default Comite;
