import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks'
import { logOut } from '../store/slices/auth'

// Un simple menu de navegacion
export default function NavMenu() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
	const dispatch = useAppDispatch()

  const handleLogout= () => {
		dispatch(logOut())
		localStorage.removeItem('SII-Token')
    navigate('/evaluacionprotocolos/comite/login')
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CEI
          </Typography>
          {isAuthenticated && <Button color="inherit" onClick={handleLogout} >Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
