import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { estudianteCTState } from '../../recoil';
import { useMutation, useQueryClient } from 'react-query';
import message from '../message';
import { Button } from '@mui/material';
import { ConsejoTutelarAlumno } from '../../components';
import { showLoading } from '@shared/hooks';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import InstruccionesEnlacesDT from './InstruccionesDT';

const DirectorTesis: React.FC = () => {
  const estudiante = useRecoilValue(estudianteCTState);
  const [disabled, setDisabled] = useState<boolean>(
    estudiante.IdEstatusCT != 3
  );

  const matricula: number = estudiante.Matricula;
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (matricula: number) =>
      await ConsejoTutelarQuerys.directorTesisEvaluar(matricula),
    {
      onSuccess: () => {
        Swal.close();
        setDisabled(true);
        queryClient.invalidateQueries();
        message();
      },
      onError: () => message(true),
    }
  );
  const handleClick = () => {
    mutate(matricula);
    showLoading(
      'Se está guardando su aprobación de consejo tutelar, por favor espere.'
    );
  };

  return (
    <>
      { !disabled && (<InstruccionesEnlacesDT />)}
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
