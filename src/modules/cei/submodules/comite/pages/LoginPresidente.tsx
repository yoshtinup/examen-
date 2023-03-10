import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
//import { useNavigate } from 'react-router-dom';
import DataService from '../services/data'
//import { useAppDispatch, useAppSelector } from '../hooks'
//import { loginFinish, loginSuccess } from '../store/slices/auth'


/**
 * despache el token
 * @returns
 */
const LoginPresidente = () => {
	const [password, setPassword] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [isError, setIsError] = React.useState(false);
	const [helperText, setHelperText] = React.useState("");
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);
	//const { isAuthenticated, loading } = useAppSelector(state => state.auth);
	//const dispatch = useAppDispatch()
	//const navigate = useNavigate()

	useEffect(() => {
		if (email.trim() && password.trim()) {
			setIsButtonDisabled(false)
		} else {
			setIsButtonDisabled(true)
		}
	}, [email, password]);

	// useEffect(() => {
	// 	if (isAuthenticated) navigate(-1)
	// }, [isAuthenticated]);

	// Login de prueba IMPORTANTE tiene que ser cambiado
	const handleLogin = () => {
		if(email === "" || password === ""){
			setIsError(true)
			setHelperText("Tiene que llenar todos los campos")
		} else {
			DataService.loginPresidente({ email: email, password: password })
				.then(response => {
					localStorage.setItem('SII-Token', response.data.token);
					//dispatch(loginSuccess({Id: response.data.id, role: response.data.role}));
					//navigate("/evaluacionprotocolos/comite/")
				})
				.catch(() => {
					setIsError(true)
					setHelperText("usuario o contraseña invalido")
				})
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			isButtonDisabled || handleLogin();
		}
	};

	const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
		(event) => {
			setEmail(event.target.value)
		};

	const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
		(event) => {
			setPassword(event.target.value)
		}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				margin: 'auto',
				padding: 6,
				maxWidth: 500
			}}
		>
			<img src='./img/logo-ecosur-sitios.png' loading="lazy" />
			<Typography sx={{
				color: 'secondary.main'
			}} component='div' variant='h5' >SII ECOSUR</Typography>
			<Typography sx={{
				color: 'secondary.main'
			}} component='div' variant='h5' >COMITES POSGRADOS (Acceso para presidente CEI)</Typography>
			<Typography sx={{
				color: 'text.secondary',
			}} align='justify' variant="subtitle1" gutterBottom component="div">
				Sistema para el soporte de resgistro y gestión del
				que hacer del personal de ECOSUR
			</Typography>
			<form  noValidate autoComplete="off">
				<Card
					sx={{
						bgcolor: 'background.paper',
						overflow: 'hidden',
						borderRadius: '12px',
						boxShadow: 1,
					}} variant="outlined">
					<CardHeader avatar={ <PersonIcon /> } titleTypographyProps={{variant: 'h6' }} title="Introduzca sus datos de acceso" />
					<CardContent>
						<div>
							<TextField
								error={isError}
								fullWidth
								id="username"
								type="email"
								label="Correo"
								inputProps={{ "data-testid": "account-username" }}
								placeholder="Correo"
								margin="normal"
								onChange={handleUsernameChange}
								onKeyPress={handleKeyPress}
								InputProps={{ // <-- This is where the toggle button is added.
									endAdornment: (
										<InputAdornment position="end">
											<EmailIcon />
										</InputAdornment>
									)
								}}
								/>
							<TextField
								id="password"
								type={showPassword ? "text" : "password"} // <-- This is where the magic happens
								label="Contraseña"
								placeholder="Contraseña"
								error={isError}
								inputProps={{ "data-testid": "account-password" }}
								margin="normal"
								fullWidth
								helperText={helperText}
								onChange={handlePasswordChange}
								onKeyPress={handleKeyPress}
								InputProps={{ // <-- This is where the toggle button is added.
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)
								}}
								/>
						</div>
					</CardContent>
					<CardActions>
						<Button
							variant="contained"
							size="large"
							color="secondary"
							onClick={handleLogin}
							data-testid="account-submit"
							disabled={isButtonDisabled}>
							Login
						</Button>
					</CardActions>
				</Card>
			</form>
		</Box>
	);
}

export default LoginPresidente;
