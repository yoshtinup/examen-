import { useState, FC, ReactNode } from 'react';
import { Box, useMediaQuery, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { Footer } from './footer';


const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
}));
//checar si el rol es el adecuado

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  return (
    <div>
      <LayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            paddingLeft: lgUp ? (isSidebarOpen ? '280px' : '85px') : 0,
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Navbar onSidebarOpen={() => setSidebarOpen(!isSidebarOpen)} open={isSidebarOpen} />
      <Sidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
      <Footer open={isSidebarOpen} />
    </div>
  );
};
