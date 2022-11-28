import type { ReactElement } from 'react'
import EvaluacionSeminarioInvestigacion from '@modules/seminarios_investigacion';
import { Layout } from '@shared/components/layouts';

const Page = () => {
  return (
    <div>
      <EvaluacionSeminarioInvestigacion idEvaluacionSeminario={340} />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
