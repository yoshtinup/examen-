import { fetchAllAlumnos, fetchAllAlumnosHistorico, removeCursor } from '../../store/slices/alumnos'
import { useAppSelector, useAppDispatch } from '../../hooks'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

/**
 * Componente paginador basado en [Anterior, Siguiente]
 * @param
 * @returns
 */
export default function CustomPagination({ history }: { history: boolean }) {
	const dispatch = useAppDispatch()
	// Obtener el cursor historico o actual
	const navigationList = history ? useAppSelector((state) => state.alumnos.history_cursor) : useAppSelector((state) => state.alumnos.current_cursor)

	// Fetch a la api dependiendo de la pestaña
	const fetchNavigation = (page: number) => {
		if (history){
			dispatch(fetchAllAlumnosHistorico(page))
		} else {
			dispatch(fetchAllAlumnos(page))
		}
	}

	// algoritmo para el regreso de la pagina
	const prevResults = () =>{
		if (navigationList.length > 2){
			dispatch(removeCursor(history))
			const page: number = navigationList[navigationList.length - 1]
			fetchNavigation(page)
		}
	}

	// Sigiente paguina
	const nextResults = () =>{
		const page: number = navigationList[navigationList.length - 1]
		fetchNavigation(page)
	}

	return (
		<Box sx={{ '& button': { m: 1 } }}>
			<div>
				<Button size="small" onClick={prevResults}>Anterior</Button>
				<Button size="small" onClick={nextResults}>Siguente</Button>
			</div>
		</Box>
	);
}
