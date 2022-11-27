import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppsIcon from '@mui/icons-material/Apps';
import IconButton from '@mui/material/IconButton';

export default function HeaderSection({ label }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          color: 'rgb(197, 107, 22) !important',
          marginBottom: '23px',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 4 }}
          >
            <AppsIcon fontSize="large"  className="iconLabelSection" />
          </IconButton>
          <Typography
            className="labelSection"
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {label}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
