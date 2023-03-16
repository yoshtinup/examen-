import React from "react";
import { TextBlue, TextContainer, ValInput } from "../atoms/Styles";
import { ValRes, ValRes2, ValText } from "../atoms/Text";

const ValorationContainer = () => {
  return (
    <>
      <TextBlue>Valoración</TextBlue>
      <TextContainer> {ValText} </TextContainer>
      <ValInput />
      <TextContainer> {ValRes} </TextContainer>
      <ValInput />
      <TextContainer> {ValRes2} </TextContainer>
      <ValInput />
    </>
  );
};

export default ValorationContainer;
