import React from 'react';
import { TextBlue, TextContainer } from '../atoms/Styles';
import { PlaneacionQuestions, Text_Planing } from '../atoms/Text';
import PlanValoration from '../atoms/PlanValoration';

const PlaningContainer = () => {
  return (
    <>
      <TextBlue>Planeación o planificación</TextBlue>
      <TextContainer> {Text_Planing} </TextContainer>
      {PlaneacionQuestions.map(val => {
        const inputErrorMesssage = '';
        return (
          <PlanValoration
            key={val.id}
            id={val.id}
            text={val.text}
            required={val.required}
            error={inputErrorMesssage ? inputErrorMesssage : null}
          />
        );
      })}
    </>
  );
};

export default PlaningContainer;
