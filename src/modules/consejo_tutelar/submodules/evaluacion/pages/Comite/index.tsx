import React from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { estudianteCTState } from '../../recoil';
import { rolStateAtom } from '@modules/auth/recoil';
import message from '../message';
import { Alert, Container, Stack, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { showLoading } from '@shared/hooks';
import { Perfil, LoadCT } from '../../components';
import Roles from '@definitions/Roles';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import { EvaluacionComite, IntegranteCT } from '@modules/consejo_tutelar/types';
import { SeccionEvaluacion } from '@modules/consejo_tutelar/components';
import Instrucciones from './Instrucciones';

function filters(rol: Roles) {
  switch (rol) {
    case Roles.Responsable_Orientacion:
      return (integrante: IntegranteCT) => integrante.evaluadoPorRO;
    case Roles.Coordinador_Unidad:
      return (integrante: IntegranteCT) => integrante.evaluadoPorCUP;
    case Roles.Coordinacion_General_Posgrado:
      return (integrante: IntegranteCT) => integrante.evaluadoPorGP;
    default:
      return (_: IntegranteCT) => true;
  }
}

function to_disable(rol: Roles, status: number): boolean {
  if (rol == Roles.Responsable_Orientacion || rol == Roles.Coordinador_Unidad)
    return status != 5;
  if (rol == Roles.Coordinacion_General_Posgrado) return status != 6;
  return true;
}

type EvaluacionData = {
  matricula: number;
  evaluaciones: EvaluacionComite[];
};

const ComiteEvaluacion: React.FC<{ integrantes: IntegranteCT[] }> = ({
  integrantes,
}) => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const estudiante = useRecoilValue(estudianteCTState);
  const filter = filters(currentRol);
  const [btnDisable, setBtnDisable] = React.useState<boolean>(
    to_disable(currentRol, estudiante.IdEstatusCT)
  );
  const matricula = estudiante.Matricula;
  const { mutate } = useMutation(
    async (e: EvaluacionData) =>
      await ConsejoTutelarQuerys.registrarEvaluacion(
        e.matricula,
        e.evaluaciones
      ),
    {
      onSuccess: () => {
        Swal.close();
        message();
      },
      onError: () => message(true),
    }
  );
  const [evaluaciones, setEvaluaciones] = React.useState<EvaluacionComite[]>(
    integrantes
      .filter((i: IntegranteCT) => !filter(i))
      .map(integrante => {
        return {
          id: integrante.idTutorSinodal,
          aprobo: true,
          comentario: null,
        };
      })
  );
  if (integrantes.length == 0)
    return (
      <Alert severity="error">No tiene acceso a este consejo tutelar</Alert>
    );
  const handleSetEvaluacion = (evaluacion: EvaluacionComite) => {
    const restEvaluaciones: EvaluacionComite[] = evaluaciones.filter(
      e => e.id != evaluacion.id
    );
    setEvaluaciones([...restEvaluaciones, evaluacion]);
  };

  const handleClick = () => {
    mutate({ matricula, evaluaciones });
    setBtnDisable(true);
    showLoading('Enviando su evaluación, por favor espere');
  };
  const internos = integrantes.filter(
    integrante => integrante.tipoAcademico === 'Interno' && !filter(integrante)
  );
  const externos = integrantes.filter(
    integrante => integrante.tipoAcademico !== 'Interno' && !filter(integrante)
  );
  const evaluado: boolean = internos.length + externos.length == 0;

  const evaluados = integrantes.filter(filter);
  return (
    <>
      <Container maxWidth="lg">
        <Instrucciones />
      </Container>
      <Container
        maxWidth="lg"
        style={{ marginBottom: '20px', padding: '25px 0px 30px 0px' }}
      >
        <Stack spacing={4}>
          <h3 style={{ marginBottom: '0px' }}>Persona estudiante</h3>
          <Perfil />
          <SeccionEvaluacion
            title="Integrantes Internos"
            integrantes={internos}
            setEvaluacion={handleSetEvaluacion}
            btnHide={btnDisable}
          />
          <SeccionEvaluacion
            title="Integrantes externos"
            integrantes={externos}
            setEvaluacion={handleSetEvaluacion}
            btnHide={btnDisable}
          />
          <SeccionEvaluacion
            title="Integrantes evaluados"
            integrantes={evaluados}
            btnHide
          />
          <Button
            disabled={btnDisable || evaluado}
            onClick={handleClick}
            variant="contained"
            color="primary"
            sx={{ width: 200 }}
          >
            Guardar evaluación
          </Button>
        </Stack>
      </Container>
    </>
  );
};

const Comite = () => {
  const estudiante = useRecoilValue(estudianteCTState);
  const matricula = estudiante.Matricula;
  return <LoadCT matricula={matricula} Component={ComiteEvaluacion} />;
};

export default Comite;
