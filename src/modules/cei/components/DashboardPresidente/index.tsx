import Home from '@modules/cei/submodules/comite/pages/Home';
import { Settings } from '@mui/icons-material';
import { Button } from '@mui/material';
import Link from 'next/link';

const DashboardPresidente = () => {
  return (
    <>
      <h3>Dashboard Presidente CEI</h3>
      <Link href="/cei/settings-cei">
        <Button variant="contained" endIcon={<Settings />}>
          Herramientas de administración
        </Button>
      </Link>
      <Home />
    </>
  );
};

export default DashboardPresidente;
