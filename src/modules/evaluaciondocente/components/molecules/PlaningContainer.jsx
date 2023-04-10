import React from 'react';
import { TextBlue, TextContainer } from '../atoms/Styles';
import { PlaneacionQuestions, Text_Planing } from '../atoms/Text';
import PlanValoration from '../atoms/PlanValoration';
const PlaningContainer = ({error}) => {
  //console.log(error);
  return (
    <>
      <TextBlue>Planeación o planificación</TextBlue>
      <TextContainer> {Text_Planing} </TextContainer>
      {PlaneacionQuestions.map(val => {
        const inputErrorMesssage = '';
        // if (error.length > 0) {
        //   const inputError = error.find(
        //     x =>
        //       x.error.toLowerCase().includes(val.id.toLocaleLowerCase()) ===
        //       true
        //   );
        //   inputErrorMesssage = inputError ? inputError.message : null;
        // }
        return(
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
