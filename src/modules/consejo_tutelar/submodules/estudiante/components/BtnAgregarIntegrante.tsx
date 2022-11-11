import React from 'react';
import { useRecoilValue } from 'recoil';
import { userStateAtom } from '@modules/auth/recoil';
import { EcosurAuth } from '@modules/auth/definitions';
import { getGrado } from '../queries';
import {
  useGetListaPersonalInterno,
  useGetListaPersonalExterno,
} from '../queries';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { FormAgregarExterno, FormAgregarInterno } from './form';
import {
  PersonalAcademico,
  AsesorExterno,
} from '@modules/consejo_tutelar/types';

type BtnAgregarIntegranteProps = {
  externo?: boolean;
  onSubmit: (
    integrante: PersonalAcademico | AsesorExterno,
    file?: File
  ) => void;
  disabled?: boolean;
};

const BtnAgregarIntegrante: React.FC<BtnAgregarIntegranteProps> = ({
  externo = false,
  onSubmit,
  disabled = false,
}) => {
  const useGetListaPersonal = externo
    ? useGetListaPersonalExterno
    : useGetListaPersonalInterno;
  const [open, setOpen] = React.useState<boolean>(false);
  const label = externo ? 'externo' : 'interno';
  const FormAgregar = externo ? FormAgregarExterno : FormAgregarInterno;
  // Maestría = 1 y Doctorado = 2
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const grado: 1 | 2 = getGrado(user.estudiante?.clavePrograma ?? 1) == 'maestria' ? 1 : 2;
  const { data, error, isLoading, isSuccess } = useGetListaPersonal(grado);
  if (error)
    return (
      <Alert severity="error">No se pudo obtener al personal {label}</Alert>
    );
  if (isLoading) return <CircularProgress />;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    isSuccess && (
      <>
        <Button
          disabled={disabled}
          variant="outlined"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
        >
          {label}
        </Button>
        <FormAgregar
          personal={data}
          open={open}
          handleClose={handleClose}
          onSubmit={onSubmit}
        />
      </>
    )
  );
};
export default BtnAgregarIntegrante;
