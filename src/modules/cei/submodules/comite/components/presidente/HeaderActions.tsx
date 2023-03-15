import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ButtonListMod from './ButtonListMod'
import InfoBox from './infoBox'
import { Numeralia } from '../../__generated__/globalTypes'
import DataService from '../../services/data'


type NumeraliaStr = {
	actuales: string,
	anteriores: string
}

// Estructura del Header del presidente
const  HeaderAction = () => {
	const [numeralia, setNumeralia] = useState<NumeraliaStr>({
		actuales: "Propuestas actuales 0",
		anteriores: "Propuestas anteriores 0"
	})
	useEffect(() => {
		DataService.getPropuestasNumeralia().then((response) => {
			const currentNumeralia: Numeralia = response.data;
			setNumeralia({
				actuales: `Propuestas actuales ${currentNumeralia.actuales}`,
				anteriores: `Propuestas anteriores ${currentNumeralia.anteriores}`
			});
		});
	}, [])
	return (
		<Box sx={{
			m: 2
		}} >
			<Grid container spacing={3}>
				<Grid item xs={12} sm={3}>
					<InfoBox label={numeralia.actuales} />
				</Grid>
				<Grid item xs={12} sm={3}>
					<InfoBox label={numeralia.anteriores} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<ButtonListMod />
				</Grid>
			</Grid>
		</Box>
	);
}

export default HeaderAction
