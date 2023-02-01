import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CustomDialog from '../modal/CustomDialog'
import QuestionModalBody from './QuestionModalBody'
import DataService from '../../services/data'


// Botones de accion para enviar notificaciones
// Solo lo usa el presidente
const ButtonListMod = () =>{
  const [openMod1, setOpenMod1] = React.useState(false);
  const handleOpenMod1 = () => setOpenMod1(true);
  const handleCloseMod1 = () => setOpenMod1(false);

  const [openMod2, setOpenMod2] = React.useState(false);
  const handleOpenMod2= () => setOpenMod2(true);
  const handleCloseMod2= () => setOpenMod2(false);

  function sendNotificacion() {
    DataService.sendAlumnosPendientes()
    handleCloseMod1()
  }

  function sendRecordatorio() {
    DataService.sendEvaluadoresPendientes()
    handleCloseMod2()
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'right'
    }} >
      <List>
        <ListItem>
          <Button color="primary" variant="contained" onClick={handleOpenMod1}>Enviar notificacion</Button>
        </ListItem>
        <ListItem>
          <Button color="primary" variant="contained" onClick={handleOpenMod2}>Enviar recordatorio</Button>
        </ListItem>
      </List>
      <CustomDialog
        title="Enviar notificaciòn"
        open={openMod1}
        onClose={handleCloseMod1}
      >
        <QuestionModalBody
          onClick={sendNotificacion}
          question="Desea notificar a todos los alumnos que tienen propuesta pendiente de enviar a evaluaciòn"
          />
      </CustomDialog>
      <CustomDialog
        title="Enviar recordatorio"
        open={openMod2}
        onClose={handleCloseMod2}
      >
        <QuestionModalBody
          onClick={sendRecordatorio}
          question="Desea enviar un recordatorio a los evaluadores que tienen propuestas pendientes de evaluar"
          />
      </CustomDialog>
    </Box>
  );
}
export default ButtonListMod
