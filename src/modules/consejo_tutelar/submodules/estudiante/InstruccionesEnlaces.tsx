import { List, Link } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';

import InsertLinkIcon from '@mui/icons-material/InsertLink';

const enlacesImportantes = () => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={8}>
        {' '}
        <h3>Instrucciones</h3>
        <p>
          En este apartado podrá registrar a las personas asesoras propuestas
          para su Consejo Tutelar (CT), Órgano Colegiado que supervisará su
          desempeño académico y colaborará en la definición y desarrollo de su
          tema de investigación.
        </p>
        <p>
          Es muy importante que antes de realizar su postulación conozca los
          lineamientos <b>(ver enlaces importantes)</b>
        </p>
        <p>
          A continuación podrá agregar a las personas propuestas, dando clic en
          el botón que corresponda.
        </p>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Enlaces importantes</h3>
          </Grid>
          <Grid item xs={12}>
            <List
              style={{ paddingTop: '0px' }}
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            >
              {' '}
              <ListItem className="itemDeLista">
                <ListItemAvatar>
                  <Avatar className="IconoDeLista">
                    <InsertLinkIcon />
                  </Avatar>
                </ListItemAvatar>
                <Link href="https://ecosur365p.sharepoint.com/sites/Posgrado-sitiodecomunicacin/SitePages/Lineamientos%20de%20conformaci%C3%B3n%20de%20consejo%20tutelar.aspx">
                  Lineamientos para la integración de CT
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default enlacesImportantes;
