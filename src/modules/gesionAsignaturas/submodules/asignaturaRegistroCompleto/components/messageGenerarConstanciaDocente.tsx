import ProfesorConstanciaParticipacion from '@modules/gesionAsignaturas/queries/apiRest';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

const MessageGenerarConstanciaDocente: React.FC<{
  idDocente: number;
}> = ({ idDocente }) => {
  const handleMessage = () => {
    Swal.fire({
      title:
        '¿Está seguro de generar la constancia del docente, se sustituirá la actual?',
      showCancelButton: true,
      confirmButtonText: 'Generar',
      confirmButtonColor: '#1ab394',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      cancelButtonColor: '#d5d8dc',
      preConfirm: () => {
        return ProfesorConstanciaParticipacion.generarIndividual(18027);
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

export default MessageGenerarConstanciaDocente;
