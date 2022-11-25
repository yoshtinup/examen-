import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { estudianteCTState } from '../../recoil';
import { useMutation } from 'react-query';
import message from '../message';
import { Button, Container } from '@mui/material';
import { ConsejoTutelarAlumno } from '../../components';
import { showLoading } from '@shared/hooks';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import InstruccionesEnlacesDT from './InstruccionesEnlacesDT';

const DirectorTesis: React.FC = () => {
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
      <ConsejoTutelarAlumno isDirector>
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={disabled}
          sx={{ width: 400 }}
        >
          Aprobar consejo tutelar
        </Button>
      </ConsejoTutelarAlumno>
    </>
  );
};

export default DirectorTesis;
