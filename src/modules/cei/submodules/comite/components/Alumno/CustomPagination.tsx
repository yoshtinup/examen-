import {
  alumnosAtom,
  fetchAllAlumnos,
  fetchAllAlumnosHistorico,
  removeCursor,
} from '../../store/slices/alumnos';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';
import { rolStateAtom, userStateAtom } from '@modules/auth/recoil';
import Roles from '@definitions/Roles';

/**
 * Componente paginador basado en [Anterior, Siguiente]
 * @param
 * @returns
 */
export default function CustomPagination({ history }: { history: boolean }) {
  // Obtener el cursor historico o actual
  const [alumnosState] = useRecoilState(alumnosAtom);
  const [rolState] = useRecoilState(rolStateAtom);
  const isPresidente = Roles[rolState] == 'Presidente_CEI' ? true : false;

  const navigationList = history
    ? alumnosState.history_cursor
    : alumnosState.current_cursor;

  // Fetch a la api dependiendo de la pestaña
  const fetchNavigation = (page: number) => {
    if (history && isPresidente) {
      fetchAllAlumnosHistorico(page, isPresidente);
    } else {
      fetchAllAlumnos(page, isPresidente);
    }
  };

  // algoritmo para el regreso de la pagina
  const prevResults = () => {
    if (navigationList.length > 2) {
      removeCursor(history);
      const page: number = navigationList[navigationList.length - 1];
      fetchNavigation(page);
    }
  };

  // Sigiente paguina
  const nextResults = () => {
    const page: number = navigationList[navigationList.length - 1];
    fetchNavigation(page);
  };

  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <div>
        <Button size="small" onClick={prevResults}>
          Anterior
        </Button>
        <Button size="small" onClick={nextResults}>
          Siguente
        </Button>
      </div>
    </Box>
  );
}
