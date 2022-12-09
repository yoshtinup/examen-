import { useContext } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography, Button } from '@mui/material';
// import { auth, ENABLE_AUTH } from '../lib/auth';
import Cookies from 'js-cookie';
import React from 'react';
import EcosurProfileDialog from '@modules/home/submodules/estudiante/components/Perfil';
import { number } from 'yup';

export const AccountPopover = props => {
  const { anchorEl, onClose, open, matricula, ...other } = props;
  // const authContext = useContext(AuthContext);

  const handleSignOut = async () => {
    onClose?.();

    Cookies.remove('selectedRol');
    Cookies.remove('userRoles');
    Cookies.remove('user');
    Cookies.remove('ecosurToken');
    
    Router.push('/login').catch(console.error);
    return;

    // Check if authentication with Zalter is enabled
    // If not enabled, then redirect is not required
    // if (!ENABLE_AUTH) {
    //   return;
    // }

    // Check if auth has been skipped
    // From sign-in page we may have set "skip-auth" to "true"
    // If this has been skipped, then redirect to "sign-in" directly
    const authSkipped =
      globalThis.sessionStorage.getItem('skip-auth') === 'true';

    if (authSkipped) {
      // Cleanup the skip auth state
      globalThis.sessionStorage.removeItem('skip-auth');

      // Redirect to sign-in page
      Router.push('/login').catch(console.error);
      return;
    }

    try {
      // This can be call inside AuthProvider component, but we do it here for simplicity
      // await auth.signOut();

      // Update Auth Context state
      // authContext.signOut();

      // Redirect to sign-in page
      Router.push('/sign-in').catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  const [openPerfil, setOpenPerfil] = React.useState<boolean>(false);
  const handleOpenPerfil = () => {
    setOpenPerfil(true);
  };
  const handleClosePerfil = () => {
    setOpenPerfil(false);
  }

console.log(matricula);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        {
          matricula &&
            <Box>
              <Typography variant="overline">Cuenta</Typography>
              <Typography color="text.secondary" variant="body2" component='div'>
                <Button variant='text' color='inherit' onClick={handleOpenPerfil}>
                  Mi Perfil
                </Button>
              </Typography>
              <EcosurProfileDialog
                open={openPerfil}
                handleClose={handleClosePerfil}
              />
            </Box>
        }
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
            },
            padding: '12px 16px',
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Cerrar sesión</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  matricula: PropTypes.number || undefined,
};
