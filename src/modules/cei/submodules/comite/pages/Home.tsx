import { useEffect } from 'react';
// redux
//import { fetchAllAlumnos, fetchAllAlumnosHistorico } from '../store/slices/alumnos'
//import { useAppDispatch, useAppSelector } from '../hooks'
// Components
import Box from '@mui/material/Box';
import { withPresidenteRole } from '../components/role/helpers';
import InformationTable from '../components/Alumno/InformationTable';
import HeaderAction from '../components/presidente/HeaderActions';
import TwoTabs from '../components/TwoTabs';

const PresidenteHeaderAction = withPresidenteRole(HeaderAction);

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
  //const { current_cursor, history_cursor } = useAppSelector((state) => state.alumnos)
  /*const dispatch = useAppDispatch();
  useEffect(() => {
    // Obtener los alumnos con propuestas de l ciclo
    dispatch(fetchAllAlumnos(current_cursor[0]))
    // Obtener los alumnos con propuestas historicas
    dispatch(fetchAllAlumnosHistorico(history_cursor[0]))
  }, [dispatch])*/
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
