import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { CardListItemChildrens, CardListItemSimple, CardListType, FontSize } from '@shared/types/cardsTypes';
import { Divider } from '@mui/material';

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export function CardList(props:any) {
  const data:CardListType = props.data;
  if(!data){
    return <></>;
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 300 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {data.Icono}
              </ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary={data.Titulo}
                primaryTypographyProps={{
                  fontSize: FontSize.large,
                  fontWeight: 'bold',
                  letterSpacing: 0,
                }}
                secondary={data.Subtitulo}
                secondaryTypographyProps={{
                  fontSize: (FontSize.middle - 3),
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            {data.Items.map((item:CardListItemChildrens, i) => {
              if(item.Childrens && item.Childrens.length > 0){
                return <ItemWithChild item={item} />;
              }else{
                return <ItemWithoutChild item={item} />;
              }
            })}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

function ItemWithChild(props:any){
  const [open, setOpen] = React.useState(false);
  const item:CardListItemChildrens = props.item;
  if(!item){
    return <></>;
  }
  return (
    <>
      <Box
        sx={{
          bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
          pb: open ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: open ? 0 : 2.5,
            '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary={item.Titulo}
            primaryTypographyProps={{
              fontSize: item.FontSize ? item.FontSize : FontSize.middle,
              fontWeight: 'bold',
              lineHeight: '20px',
              mb: '2px',
            }}
            secondary={item.Subtitulo}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: item.FontSize ? (item.FontSize - 3) : (FontSize.middle - 3),
              lineHeight: '16px',
              color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              opacity: 0,
              transform: open ? 'rotate(-180deg)' : 'rotate(0)',
              transition: '0.2s',
            }}
          />
        </ListItemButton>
        {open && item.Childrens && item.Childrens.length > 0 &&
          item.Childrens.map((item:CardListItemSimple, i) => (
            <ItemWithoutChild key={i} item={item} />
          ))}
      </Box>
      <Divider />
    </>
  );
}

function ItemWithoutChild(props:any){
  const item:CardListItemSimple = props.item;
  if(!item){
    return <></>;
  }
  return (
    <>
      <ListItemButton onClick={item.Onclick}>
        <ListItemIcon>
          {item.Icono}
        </ListItemIcon>
        <ListItemText
          sx={{ my: 0 }}
          primary={item.Titulo}
          primaryTypographyProps={{
            fontSize: item.FontSize ? item.FontSize : FontSize.middle,
            fontWeight: 'medium',
            letterSpacing: 0,
          }}
          secondary={item.Subtitulo}
          secondaryTypographyProps={{
            fontSize: item.FontSize ? (item.FontSize - 3) : (FontSize.middle - 3),
            fontWeight: 'medium',
            letterSpacing: 0,
          }}
        />
      </ListItemButton>
      <Divider />
    </>
  );
}
