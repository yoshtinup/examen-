import ProfesorConstanciaParticipacion from '@modules/gesionAsignaturas/queries/apiRest';
import { Button } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';

const MessageGenerarConstnaciasPersonal: React.FC<{
  idMOA: number;
}> = ({ idMOA }) => {
  const handleMessage = () => {
    Swal.fire({
      title:
        'Está seguro de generar las constancias de los docentes registrados',
      showCancelButton: true,
      confirmButtonText: 'Generar',
      confirmButtonColor: '#1ab394',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      cancelButtonColor: '#d5d8dc',
      preConfirm: () => {
        return ProfesorConstanciaParticipacion.generar(idMOA);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Carta generada exitosamente`,
          text: result.value.message,
        });
      }
    });
  };

  return (
    <div style={{ width: '100%', height: '38px' }}>
      <Button
        variant="outlined"
        style={{ float: 'right' }}
        onClick={handleMessage}
      >
        Generar constancias del personal docente
      </Button>
    </div>
  );
};

export default MessageGenerarConstnaciasPersonal;
