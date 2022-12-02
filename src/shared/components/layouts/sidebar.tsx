import { useEffect, FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  Theme,
} from '@mui/material';
import Icon from '@mui/icons-material/AirlineSeatFlat';
import { NavItem } from './nav-item';

type ItemsNav = {
  href: string;
  icon: JSX.Element;
  title: string;
};

const items: ItemsNav[] = [
  {
    href: '/consejo_tutelar',
    icon: <Icon />,
    title: 'Consejo Tutelar',
  },
  {
    href: 'seminarios_investigacion',
    icon: <Icon />,
    title: 'Seminario Investigación',
  },
];

type SidebarProps = {
  onClose: () => void;
  open: boolean;
};

export const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const router = useRouter();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Box
            sx={{ p: 3 }}
            style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}
          >
            <NextLink href="/" passHref>
              <img
                id="logoEcosur"
                src="https://estancias-estudiantes-externos.ecosur.mx/static/media/logo-ecosur.1e134fb2163d7df4654a.png"
                alt="logo"
              />
            </NextLink>
          </Box>
        </div>

        <Box sx={{ flexGrow: 1 }}>
          {items.map((item: ItemsNav) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
