import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, CircularProgress } from '@mui/material';
import { HeaderSection } from '@shared/components';
import { Layout } from '@shared/components/layouts';
import Evaluacion from '@modules/consejo_tutelar/submodules/evaluacion';

export default function Page() {
  const router = useRouter();
  const matricula = router.query.matricula;
  if (!matricula) return <CircularProgress />;

  return (
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="CONFORMACIÓN DE CONSEJO TUTELAR (CT)" />
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <Evaluacion matricula={Number(matricula)} />
      </Box>
    </Container>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
