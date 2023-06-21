import type { ReactElement } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { Layout } from '@shared/components/layouts';
import { useRouter } from 'next/router';
import AsignaturaRegistroCompleto from '@modules/gesionAsignaturas/submodules/asignaturaRegistroCompleto';

const Page = () => {
  const router = useRouter();
  const idMOA = router.query.idMateriaOfertaAnual;
  if (!idMOA) return <CircularProgress />;
  return (
    <Container maxWidth={false} style={{ padding: '30px' }}>
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
      >
        <AsignaturaRegistroCompleto idMOA={Number(idMOA)} />
      </Box>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
