import React from 'react';
import { TextBlue, TextContainer } from '../atoms/Styles';
import { PlaneacionQuestions, Text_Planing } from '../atoms/Text';
import PlanValoration from '../atoms/PlanValoration';
import { useRecoilValue } from 'recoil';
import { planeacionState } from '@modules/evaluaciondocente/recoil/planeacionState';
const PlaningContainer = () => {
  const selectedOption = useRecoilValue(planeacionState);
  return (
    <>
      <TextBlue>Planeación o planificación</TextBlue>
      <TextContainer> {Text_Planing} </TextContainer>
      {PlaneacionQuestions.map(val => {
        return (
          <PlanValoration
            pregunta={val}
            respuestaValue={selectedOption[val.id]}
          />
        );
      })}
    </>
  );
};

export default PlaningContainer;
