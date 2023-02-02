import { useEffect } from 'react';
// redux
import {
  alumnosAtom,
  fetchAllAlumnos,
  fetchAllAlumnosHistorico,
} from '../store/slices/alumnos';
//import { useAppDispatch, useAppSelector } from '../hooks'
// Components
import Box from '@mui/material/Box';
import InformationTable from '../components/Alumno/InformationTable';
import HeaderAction from '../components/presidente/HeaderActions';
import TwoTabs from '../components/TwoTabs';
import { WithRol } from '@shared/hooks';
import Roles from '@definitions/Roles';
import { useRecoilState } from 'recoil';

const PresidenteHeaderAction = WithRol(Roles.Presidente_CEI)(HeaderAction);

/**
 * Retorna Estructrua para las pestañas
 * @param {string} label
 * @param {string} history
 * @returns
 */
function getTable(label: string, history: boolean = false) {
  return {
    label: label,
    component: <InformationTable history={history} />,
  };
}

/**
 * Gerenera la pagina principal
 * @returns
 */
const Home = () => {
  const [alumnosState, setAlumnosState] = useRecoilState(alumnosAtom);
  console.log('alumnosState', alumnosState);
  useEffect(() => {
    console.log('entro al use effect');
    // Obtener los alumnos con propuestas de l ciclo
    fetchAllAlumnos(alumnosState.current_cursor[0])().then(res => {
      const cursors = alumnosState.current_cursor.concat(res.cursor);
      setAlumnosState(alumnos => ({
        ...alumnos,
        current: res.data,
        current_cursor: cursors,
      }));
    });

    // Obtener los alumnos con propuestas historicas
    fetchAllAlumnosHistorico(alumnosState.history_cursor[0])().then(res => {
      const cursors = alumnosState.history_cursor.concat(res.cursor);
      setAlumnosState(alumnos => ({
        ...alumnos,
        history: res.data,
        history_cursor: cursors,
      }));
    });
  }, []);
  // Solo se muestra para el rol Presidente
  return (
    <Box sx={{ width: '100%' }}>
      <PresidenteHeaderAction />
      <TwoTabs
        tab1={getTable('Propuestas actuales')}
        tab2={getTable('Historial de revisiones', true)}
      />
    </Box>
  );
};

export default Home;
