import { useRef, useState, FC } from 'react';
import { styled } from '@mui/system';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputLabel,
  Toolbar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
/* import { UserCircle as UserCircleIcon } from '../icons/user-circle'; */
import UserCircleIcon from '@mui/icons-material/AccountCircle';
import { AccountPopover } from './account-popover';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { EcosurAuth } from '@modules/auth/definitions';
import { userStateAtom } from '@modules/auth/recoil';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background,
  /* boxShadow: theme.shadows[1], */
}));

type NavbarProps = {
  onSidebarOpen: () => void;
  open: Boolean;
};

export const Navbar: FC<NavbarProps> = ({ onSidebarOpen, open, ...other }) => {
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  
  return (
    <>
      <NavbarRoot
        id="HeaderDataPersona"
        sx={{
          left: {
            lg: open ? 280 : 85,
          },
          width: {
            lg: open ? 'calc(100% - 280px)' : 'calc(100% - 85px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <InputLabel className='text-white'>{user?.personal?.nombreCompleto || user?.estudiante?.nombreCompleto}</InputLabel>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </NavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
        matricula={user?.estudiante?.matricula}
      />
    </>
  );
};
