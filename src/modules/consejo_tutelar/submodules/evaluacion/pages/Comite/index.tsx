import React from 'react';
import { useMutation } from 'react-query';
import ConsejoTutelarQuerys from '@modules/consejo_tutelar/queries';
import { useRecoilValue } from 'recoil';
import { matriculaState } from '../../recoil';
import { rolStateAtom } from '@modules/auth/recoil';
import message from '../message';
import { Alert, Container, Stack, Button } from '@mui/material';
import { EvaluacionComite, IntegranteCT } from '@modules/consejo_tutelar/types';
import { EcosurSectionTitle } from 'ecosur-ui';
import { Perfil, LoadCT } from '../../components';
import IntegranteEvaluacion from './IntegranteEvaluacion';
import Roles from '@definitions/Roles';

type SeccionEvaluacionProps = {
  title: string;
  btnHide?: boolean;
  integrantes: IntegranteCT[];
  setEvaluacion?: (evaluacion: EvaluacionComite) => void;
};

const SeccionEvaluacion: React.FC<SeccionEvaluacionProps> = ({
  title,
  btnHide = false,
  integrantes,
  setEvaluacion = (_: EvaluacionComite) => {},
}) => {
  if (integrantes.length == 0) return;
  return (
    <div>
      <EcosurSectionTitle label={title} variant="h6" bgcolor="secondary" />
      {integrantes.map(integrante => (
        <IntegranteEvaluacion
          key={`integrante-evaluacion-${integrante.idTutorSinodal}`}
          btnHide={btnHide}
          integrantes={integrante}
          setEvaluacion={setEvaluacion}
        />
      ))}
    </div>
  );
};

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

type EvaluacionData = {
  matricula: number;
  evaluaciones: EvaluacionComite[];
};

const ComiteEvaluacion: React.FC<{ integrantes: IntegranteCT[] }> = ({
  integrantes,
}) => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  const filter = filters(currentRol);
  const matricula = useRecoilValue<number>(matriculaState);
  const { mutate, isLoading } = useMutation(
    async (e: EvaluacionData) =>
      await ConsejoTutelarQuerys.registrarEvaluacion(
        e.matricula,
        e.evaluaciones
      ),
    {
      onSuccess: () => message(),
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
  const [btnDisable, setBtnDisable] = React.useState<boolean>(false);
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
  };
  const internos = integrantes.filter(
    integrante => integrante.tipoAcademico === 'Interno'
  );
  const externos = integrantes.filter(
    integrante => integrante.tipoAcademico !== 'Interno'
  );

  const evaluados = integrantes.filter(filter);
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
        <SeccionEvaluacion
          title="Integrantes evaluados"
          integrantes={evaluados}
          btnHide
        />
        <Button
          disabled={btnDisable}
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

const Comite = () => {
  const matricula = useRecoilValue<number>(matriculaState);
  return <LoadCT matricula={matricula} Component={ComiteEvaluacion} />;
};

export default Comite;
