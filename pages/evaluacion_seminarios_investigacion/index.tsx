import type { ReactElement } from 'react'
import EvaluacionSeminarioInvestigacion from '@modules/evaluacion_seminarios_investigacion';
import { Layout } from '@shared/components/layouts';

const Page = () => {
  return (
    <div>
      <EvaluacionSeminarioInvestigacion />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
