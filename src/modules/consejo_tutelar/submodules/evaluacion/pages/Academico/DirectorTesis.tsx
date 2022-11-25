import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { estudianteCTState } from '../../recoil';
import { useMutation } from 'react-query';
import message from '../message';
import { Button, Stack, Container } from '@mui/material';
import { Perfil } from '../../components';
import { IntegranteCT } from '@modules/consejo_tutelar/types';
import { showLoading } from '@shared/hooks';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import { LoadCT } from '../../components';
import { SeccionEvaluacion } from '@modules/consejo_tutelar/components';
import InstruccionesEnlacesDT from './InstruccionesEnlacesDT';

const DirectorTesisPage: React.FC<{ integrantes: IntegranteCT[] }> = ({
  integrantes,
}) => {
  const estudiante = useRecoilValue(estudianteCTState);
  const [disabled, setDisabled] = useState<boolean>(
    estudiante.IdEstatusCT != 3
  );
  const matricula: number = estudiante.Matricula;
  const { mutate } = useMutation(
    async (matricula: number) =>
      await ConsejoTutelarQuerys.directorTesisEvaluar(matricula),
    {
      onSuccess: () => {
        Swal.close();
        setDisabled(true);
        message();
      },
      onError: () => message(true),
    }
  );
  const handleClick = () => {
    mutate(matricula);
    showLoading('Su evaluación esta siendo enviada');
  };

  return (
    <>
      <Container maxWidth="lg">
        <InstruccionesEnlacesDT />
      </Container>
      <Container
        maxWidth="lg"
        style={{ marginBottom: '20px', padding: '25px 0px 30px 0px' }}
      >
        <Stack spacing={4}>
          <h3 style={{ marginBottom: '0px' }}>Persona estudiante</h3>
          <Perfil />
          <SeccionEvaluacion
            title="Integrantes de consejo tutelar"
            integrantes={integrantes}
            btnHide
          />
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={disabled}
            sx={{ width: 400 }}
          >
            Aprobar consejo tutelar
          </Button>
        </Stack>
      </Container>
    </>
  );
};

const DirectorTesis = () => {
  const estudiante = useRecoilValue(estudianteCTState);
  const matricula = estudiante.Matricula;
  return (
    <LoadCT matricula={matricula} Component={DirectorTesisPage} isDirector />
  );
};

export default DirectorTesis;
