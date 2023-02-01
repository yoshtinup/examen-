import { FC } from 'react'
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


type QuestionModalBodyProps = {
  question: string
  onClick: () => void
}

// modal para preguntas sencillo usado por los botones de notificacion
const QuestionModalBody: FC<QuestionModalBodyProps> = ({ question, onClick }) => {
  question = `¿${question}?`
  return (
      <>
        <DialogContent>
          <DialogContentText>
            {question}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClick}>
           enviar
          </Button>
        </DialogActions>
    </>
  );
}

export default QuestionModalBody
