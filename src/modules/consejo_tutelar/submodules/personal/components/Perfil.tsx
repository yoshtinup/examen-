import { EcosurProfileCard } from 'ecosur-ui';

const users = {
  name: 'Eduardo Miguel Victoria Sánchez',
  unidad: 'San Cristobal de las casas',
  matricula: 235434,
  matricula2: 235434,
  matricula3: 235434,
  name2: 'Eduardo Miguel Victoria Sánchez',
  matricula5: 235434,
  matricula6: 235434,
  matricula8: 235434,
};

const Perfil = () => {
  return <EcosurProfileCard data={users} />;
};
export default Perfil;
