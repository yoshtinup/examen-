import { Button, Stack, Container } from '@mui/material';
import { Perfil } from '../components';
import { IntegranteCT } from '@modules/consejo_tutelar/types';

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

const ConsejoTutelar = () => {
  return(
    <div>
     cambiar por consejo tutelar
    </div>
  )



}

const DirectorTesis = () => {
  const handleClick = () => {
    console.log('Enviar Evaluacion');
  };

  return (
    <Container maxWidth="md">
      {/* FIXME: @iocampo agregar instrucciones */}
      <Stack spacing={2} sx={{ p: 5 }}>
        <Perfil />
        {/* FIXME: incluir division */}
        <Button variant="contained" onClick={handleClick} sx={{ width: 100 }}>
          Aprobar
        </Button>
      </Stack>
    </Container>
  );
};

export default DirectorTesis;
