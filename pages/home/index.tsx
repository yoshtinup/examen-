import type { ReactElement } from 'react';

import { Box, Container } from '@mui/material';
import Home from '@modules/home';
import { Layout } from '@shared/components/layouts';
import { HeaderSection } from '@shared/components';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';

const Header = WithRol(Roles.Servicios_Escolares)(
 ()=> HeaderSection({label:"GESTIÓN POR SERVICIOS ESCOLARES"})//,shadow:false
);

const Page = ({matricula}) => {
  ;
  return (
    <Container maxWidth={false} style={{ padding: '30px' }}>
       <Header/>
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
      >
        <Home matricula={matricula}/>
      </Box>
    </Container>
  );
};

Page.getInitialProps = ({ query }) => {
  return { matricula: query.matricula };
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
