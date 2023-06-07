import type { ReactElement } from 'react';

import { Box, Container } from '@mui/material';
import Home from '@modules/home';
import { Layout } from '@shared/components/layouts';

const Page = ({matricula}) => {
  ;
  return (
    <Container maxWidth={false} style={{ padding: '30px' }}>
      
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
console.log(Page.getInitialProps)
Page.getInitialProps = ({ query }) => {
  return { matricula: query.matricula };
 };

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
