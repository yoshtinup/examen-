import type { ReactElement } from 'react'
import InscripcionesPage from '@modules/inscripciones';
import { Layout } from '@shared/components/layouts';
import React from 'react';
import { Container, Box } from '@mui/system';
import { HeaderSection } from '@shared/components';

const Page = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="SEGUIMIENTO DE INSCRIPCIONES A PERIODOS" />
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <InscripcionesPage />    
      </Box>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
