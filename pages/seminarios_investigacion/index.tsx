import type { ReactElement } from 'react'
import SeminariosEvaluacion from '@modules/seminarios_investigacion/submodules/servicios_escolares';
import { Layout } from '@shared/components/layouts';
import React from 'react';

const Page = () => {
  return (
    <div>
        <SeminariosEvaluacion />    
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
