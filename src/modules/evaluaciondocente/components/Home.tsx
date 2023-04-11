import { Grid } from '@mui/material';

const Home = () => {
  return (
    <Grid item xs={18}>
      <h3>Introducción</h3>
      <p>
        El cuestionario está configurado por seis dimensiones{' '}
        <b>cuantitativas</b>, que se relacionan con competencias docentes y al
        final una dimensión <b>cualitativa</b> adicional para verter comentarios
        que complementan la evaluación. Las respuestas son confidenciales y los
        resultados serán utilizados para fines de evaluación por parte del
        Comité de Evaluación Docente, por lo tanto, el profesor o profesora
        evaluada no recibirá los resultados directamente, sólo el resultado por
        dimensiones, las respuestas a las valoraciones y las recomendaciones que
        realice el comité.Toda la información y datos que aquí se presentan son
        confidenciales y no podrán ser difundidos en ningún medio ya sea impreso
        o digital de conformidad a la Ley General de Protección de Datos
        Personales en Posesión de Sujetos Obligados vigente.{' '}
        <b>Si estás de acuerdo inicia el formulario.</b>
      </p>
      <h3>Instrucciones</h3>
      <p>
        1. Lee atentamente los enunciados y selecciona la opción de evaluación
        que consideres corresponde a la asignatura y al desempeño del personal
        docente
      </p>
      <p>
        2. Haga clic en el botón <b>"Enviar evaluación".</b> Una vez enviada no
        podrá modificarla. Todos los campos deben ser contestados para enviar su
        evaluación.
      </p>
    </Grid>
  );
};

export default Home;
