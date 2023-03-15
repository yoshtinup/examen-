import { useRecoilValue } from 'recoil';
import { estudianteCTState } from '../recoil';
import { PerfilWithoutFetch } from '@shared/components';
import Link from '@mui/material/Link';

const Perfil = () => {
  const estudiante = useRecoilValue(estudianteCTState);
  /* const dataExtra = { "Estatus consejo tutelar": estudiante.LeyendaEstatusCT }; */
  return (
    <>
      <PerfilWithoutFetch estudiante={estudiante} />
      {estudiante.CartaAceptacion && (
        <Link ml={4} target="_blank" href={`${estudiante.CartaAceptacion}`}>
          Ver carta de aceptación
        </Link>
      )}
    </>
  );
};

export default Perfil;
