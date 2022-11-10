import { useRecoilValue } from 'recoil';
import { estudianteState } from '../recoil';
import { PerfilWithoutFetch } from '@shared/components';

const Perfil = () => {
  const estudiante = useRecoilValue(estudianteState);
  return <PerfilWithoutFetch estudiante={estudiante} />;
};

export default Perfil;
