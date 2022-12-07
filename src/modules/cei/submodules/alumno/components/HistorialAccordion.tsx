import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type HistorialRevisionesProps = {
  date: string,
  component: React.ReactNode
}

type HistotyProps = {
  prefix: string,
  revisiones: Array<HistorialRevisionesProps>,
}

type AccordionProps = {
  history: HistotyProps
}

/**
 * Genera un acordion por cada propuesta historica de un alumno
 * @param
 * @returns
 */
const  HistorialAccordion: React.FC<AccordionProps> = ({history}) => {
  const generateAccordion = () => (
    history.revisiones.map((revision, index: number) => (
      <Accordion  key={`History-Acordion-${index}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel1a-content-${index}`}
          id={`panel1a-header-${index}`}
        >
          <Typography component={"span"} >{history.prefix + revision.date}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {revision.component}
        </AccordionDetails>
      </Accordion>
    )))

  return (
    <div>
      {generateAccordion()}
    </div>
  );
}

export default HistorialAccordion
