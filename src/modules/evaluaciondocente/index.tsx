import { Home } from './components';
import { WithRol, WithRoles } from '@shared/hooks';
import Roles from '@definitions/Roles';
import Introduction from './components/atoms/Introduction';
import Plan from './components/atoms/Plan';
import SubjectInf from './components/atoms/SubjectInf';
import Title from './components/atoms/Title';
import DocContainer from './components/molecules/DocContainer';
import QuestContainer from './components/molecules/QuestContainer';
import ValdocContainer from './components/molecules/ValdocContainer';
import ValorationContainer from './components/molecules/ValorationContainer';
import { SubmitButton } from './components/atoms/Styles';
import { useState } from 'react';
const HomePage = WithRol(Roles.Estudiante)(Home);
import EvaluacionDocenteQuerys from './queries/apiRest';

const EvaluacionDocente = ({ docentes }) => {
  const [planeacion, setPlaneacion] = useState({
    p_I_1: 0,
    p_I_2: 0,
    p_I_3: 0,
    p_I_4: 0,
  });
  const [valoracion, setValoracion] = useState({
    valoracion_P_1: '',
    valoracion_P_2: '',
    valoracion_P_3: '',
  });

  const handleSend = async () => {
    const data = {
      idMateriasOfertaAnual: 8632,
      planeacionDelCurso: planeacion,
      valoracionDelCurso: valoracion,
      profesores: [
        {
          idProfesores: 1,
          respuestas: {
            selects: {
              p_II_5: 0,
              p_II_6: 0,
              p_II_7: 0,
              p_II_8: 0,
              p_III_9: 0,
              p_III_10: 0,
              p_III_11: 0,
              p_IV_12: 0,
              p_IV_13: 0,
              p_IV_14: 0,
              p_IV_15: 0,
              p_V_16: 0,
              p_V_17: 0,
              p_VI_18_1: 0,
              p_VI_18_2: 0,
              p_VI_18_3: 0,
              p_VI_18_4: 0,
              p_VI_18_5: 0,
              p_VI_18_6: 0,
              p_VI_18_7: 0,
              p_VI_18_8: 0,
              p_VI_19_1: 0,
              p_VI_19_2: 0,
              p_VI_19_3: 0,
              p_VI_19_4: 0,
              p_VI_20: 0,
              p_VI_21: 0,
            },
            textAreas: {
              valoracion_P_3: 'tr',
              valoracion_P_4: '34',
            },
          },
        },
      ],
    };

    const resultado = await EvaluacionDocenteQuerys.sendEvaluacion(data);
    console.log(resultado);
  };

  return (
    <>
      <HomePage />
      <Title />
      <br />
      <SubjectInf />
      <Introduction />
      <Plan />
      <QuestContainer planeacion={planeacion} setPlaneacion={setPlaneacion} />
      <ValorationContainer
        valoracion={valoracion}
        setValoracion={setValoracion}
      />
      <ValdocContainer />
      <DocContainer docentes={docentes} />
      <br />
      <SubmitButton onClick={handleSend}>Enviar evaluación</SubmitButton>
    </>
  );
};
export default EvaluacionDocente;
