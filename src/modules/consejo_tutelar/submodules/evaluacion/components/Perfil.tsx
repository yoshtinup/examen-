import { useRecoilValue } from 'recoil';
import { estudianteCTState } from '../recoil';
import { PerfilWithoutFetch } from '@shared/components';

const Perfil = () => {
  const estudiante = useRecoilValue(estudianteCTState);
  /* const dataExtra = { "Estatus consejo tutelar": estudiante.LeyendaEstatusCT }; */
  return <PerfilWithoutFetch estudiante={estudiante} />;
};

export default Perfil;
