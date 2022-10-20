import React from 'react';
import Button from '@mui/material/Button';
import { FormAgregarExterno, FormAgregarInterno } from './components';
const Alumno = () => {
  const [openAgregarExterno, setOpenAgregarExterno] =
    React.useState<boolean>(false);
  const [openAgregarInterno, setOpenAgregarInterno] =
    React.useState<boolean>(false);

  const handleClickOpenAgregarInterno = () => {
    setOpenAgregarInterno(true);
  };

  const handleCloseAgregarInterno = () => {
    setOpenAgregarInterno(false);
  };

  const handleClickOpenAgregarExterno = () => {
    setOpenAgregarExterno(true);
  };

  const handleCloseAgregarExterno = () => {
    setOpenAgregarExterno(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpenAgregarInterno}>
        Agregar Asesor Interno
      </Button>
      <Button variant="outlined" onClick={handleClickOpenAgregarExterno}>
        Agregar Asesor Externo
      </Button>
      <FormAgregarInterno
        open={openAgregarInterno}
        handleClose={handleCloseAgregarInterno}
      />
      <FormAgregarExterno
        open={openAgregarExterno}
        handleClose={handleCloseAgregarExterno}
      />
    </div>
  );
};
export default Alumno;
