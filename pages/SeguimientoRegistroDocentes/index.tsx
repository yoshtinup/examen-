import type { ReactElement } from 'react';
import { Box, Container } from '@mui/material';
import { Layout } from '@shared/components/layouts';
import RenderIFrame from '@modules/iFrameConRol';
import Roles from '@definitions/Roles';

const Page = () => {
  const url: string = process.env.APPSMITH_URL + "/app/funcionalidades-sip/listado-registrodocente-649dae7de8023e77eb94df4a?embed=true"
  return (
    <Container maxWidth={false} style={{ padding: '30px' }}>
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
      >
        <RenderIFrame url={url} rol={Roles.Servicios_Escolares} />
      </Box>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
