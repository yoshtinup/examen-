import { useRecoilValue } from 'recoil';
import { matriculaState } from '../../recoil';
import { useMutation } from 'react-query';
import message from '../message';
import { Button, Stack, Container } from '@mui/material';
import { Perfil } from '../../components';
import { IntegranteCT } from '@modules/consejo_tutelar/types';
import ConsejoTutelarQuerys from '@modules/consejo_tutelar/queries';
import { EcosurContainer } from 'ecosur-ui';
import { LoadCT } from '../../components';
import { Typography } from '@mui/material';

const ConsejoTutelar: React.FC<{ integrantes: IntegranteCT[] }> = ({
  integrantes,
}) => (
  <div>
    {integrantes.map((integrante, index) => (
      <Typography key={`integrante-ct-dt-${index}`}>
        <b>{index + 1}.</b> {integrante.nombre}({integrante.participacion})
      </Typography>
    ))}
  </div>
);

const DirectorTesis = () => {
  const matricula: number = useRecoilValue<number>(matriculaState);
  const { mutate, isLoading } = useMutation(
    async (matricula: number) =>
      await ConsejoTutelarQuerys.directorTesisEvaluar(matricula),
    {
      onSuccess: () => message(),
      onError: () => message(true),
    }
  );
  const handleClick = () => {
    mutate(matricula);
  };
  const components = [
    {
      componente: <Perfil />,
    },
    {
      titulo: 'Integrantes:',
      componente: (
        <LoadCT matricula={matricula} isDirector Component={ConsejoTutelar} />
      ),
    },
  ];

  return (
    <Container maxWidth="md">
      {/* FIXME: @iocampo agregar instrucciones */}
      <Stack spacing={2} sx={{ p: 5 }}>
        <EcosurContainer data={components} />
        {/* FIXME: incluir division */}
        <Button variant="contained" onClick={handleClick} sx={{ width: 100 }}>
          Aprobar
        </Button>
      </Stack>
    </Container>
  );
};

export default DirectorTesis;
