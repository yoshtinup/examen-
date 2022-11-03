import { ReactElement } from 'react';

import { Layout } from '@shared/components/layouts';

const Page = () => {
  return <h1>Hola mundo</h1>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
