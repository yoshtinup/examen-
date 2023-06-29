import Roles from '@definitions/Roles';
import { rolStateAtom } from '@modules/auth/recoil';
import { useRecoilValue } from 'recoil';

const RenderIFrame = ({
  url,
  rol
}:{
  url: string,
  rol: Roles
}) => {
  const currentRol: Roles = useRecoilValue(rolStateAtom);
  if(currentRol != rol){
    return <>No posee autorización suficiente.</>;
  }
  return (
    <iframe
      src={url}
      style={{
        minWidth: '100%',
        minHeight: '80vh',
        border: '0px'
      }}>
    </iframe>
  );
};

export default RenderIFrame;
