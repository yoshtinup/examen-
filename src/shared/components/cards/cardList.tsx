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
import { Divider, ListItem } from '@mui/material';

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
            mode: 'light',
            primary: { main: '#fff' },/*'rgb(102, 157, 246)' },#3B8370*/
            background: { paper: '#fff' },/*'rgb(5, 30, 52)' },#3B8370*/
          },
        })}
      >
        <Paper elevation={0} sx={{ width: '100%' }}>
          <FireNav component="nav" disablePadding>
            <ListItem>
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
                secondary={
                  data.Subtitulo.split(", ").map((item, i) =>
                    <p key={i} style={{margin: '0'}}>
                      {item} <br />
                    </p>
                  )
                }
                secondaryTypographyProps={{
                  fontSize: (FontSize.middle - 3),
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItem>
            <Divider />
            {data.Items.map((item:CardListItemChildrens, i) => {
              if(item.Childrens && item.Childrens.length > 0){
                return <ItemWithChild key={i} item={item} />;
              }else{
                return <ItemWithoutChild key={i} item={item} lastItem={i==data.Items.length-1} />;
              }
            })}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

function ItemWithChild(props:any){
  const item:CardListItemChildrens = props.item;
  const [open, setOpen] = React.useState(item.OpenDefault);
  if(!item){
    return <></>;
  }
  return (
    <>
      <Box
        sx={{
          bgcolor: open ? 'rgba(255, 255, 255, 0.2)'/*'rgba(71, 98, 130, 0.2)'*/ : null,
          pb: open ? 1 : 0,
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
              color: item.Important ? '#c56b16' : 'initial',
              fontWeight: 'bold',
              lineHeight: '20px',
              mb: '2px',
            }}
            secondary={item.Subtitulo}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: item.FontSize ? (item.FontSize - 3) : (FontSize.middle - 3),
              lineHeight: '16px',
              color: open ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.7)',
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
          item.Childrens.map((element:CardListItemSimple, i) => (
            <ItemWithoutChild key={i} item={element} lastItem={i==item.Childrens.length-1} />
          ))}
      </Box>
      <Divider />
    </>
  );
}

function ItemWithoutChild(props:any){
  const item:CardListItemSimple = props.item;
  const lastItem:boolean = props.lastItem;
  if(!item){
    return <></>;
  }
  const ItemIcon =
    <ListItemIcon>
      {item.Icono}
    </ListItemIcon>;
  const ItemText =
    <ListItemText
      sx={{
        my: 0,
        color: (item.Onclick && item.Onclick != null) ? '#1ab394' : (item.Important)? '#c56b16' : (item.Warning ?'orange':'initial'),
        textDecoration: (item.Onclick && item.Onclick != null) ? 'underline' : 'none'
      }}
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
    />;
  return (
    <>
      {(item.Onclick && item.Onclick != null)
        ?
        <ListItemButton onClick={item.Onclick}>
          {ItemIcon}{ItemText}
        </ListItemButton>
        :
        <ListItem>
          {ItemIcon}{ItemText}
        </ListItem>
      }
      {!lastItem &&
        <Divider />
      }
    </>
  );
}
