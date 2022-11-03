import type { ReactElement } from 'react'
import ConsejoTutelar from '@modules/consejo_tutelar';
import { Layout } from '@shared/components/layouts';

const Page = () => {
  return (
    <div>
      <ConsejoTutelar />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
