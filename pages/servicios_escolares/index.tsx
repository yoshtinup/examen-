import type { ReactElement } from 'react'
import SeminariosEvaluacion from '@modules/seminarios_investigacion/submodules/servicios_escolares';
import { Layout } from '@shared/components/layouts';
import React from 'react';
import { Container, Box } from '@mui/system';
import { HeaderSection } from '@shared/components';
import TableroServiciosEscolares from '@modules/tablero_servicios_escolares';

const Page = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="Servicios escolares" />
      <TableroServiciosEscolares/>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;