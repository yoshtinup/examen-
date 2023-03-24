import React from "react";
import { TextBlue, TextContainer } from "../atoms/Styles";
import { PlaneacionQuestions, Text_Planing } from "../atoms/Text";
import PlanValoration from '../atoms/PlanValoration';
const PlaningContainer = ({error}) => {
  return (
    <>
      <TextBlue>Planeación o planificación</TextBlue>
      <TextContainer> {Text_Planing} </TextContainer>
      {PlaneacionQuestions.map(plan => {
        const inputErrorMesssage = '';
        // if (error.length > 0) {
        //   const inputError = error.find(
        //     x =>
        //       x.error.toLowerCase().includes(plan.id.toLocaleLowerCase()) ===
        //       true
        //   );
        //   inputErrorMesssage = inputError ? inputError.message : null;
        // }
        return(
         <PlanValoration
         id={plan.id}
         text={plan.text}
         required={plan.required}
         error={inputErrorMesssage ? inputErrorMesssage : null}/>
        );
      })}
    </>
  );
};

export default PlaningContainer;
