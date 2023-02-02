import Detalles from '@modules/cei/submodules/comite/pages/Detalles';
import { CircularProgress } from '@mui/material';
import { Layout } from '@shared/components/layouts';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export default function Page() {
  const router = useRouter();
  const matricula = router.query.matricula;
  if (!matricula) return <CircularProgress />;
  return (
    <>
      <Detalles />
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
