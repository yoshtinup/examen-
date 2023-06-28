import type { ReactElement } from 'react'
import SeminariosEvaluacion from '@modules/seminarios_investigacion/submodules/servicios_escolares';
import { Layout } from '@shared/components/layouts';
import React from 'react';
import { Container, Box } from '@mui/system';
import { HeaderSection } from '@shared/components';
import TableroServiciosEscolares from '@modules/tablero_servicios_escolares';
import EstudiantesPage from '@modules/estudiantes';

const Page = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="SEGUIMIENTO DE ESTUDIANTES" />
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <EstudiantesPage />    
      </Box>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;