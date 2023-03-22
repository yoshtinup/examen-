import React from 'react';
import { TextBlue, TextContainer, ValInput } from '../atoms/Styles';
import { ValRes, ValRes2, ValText } from '../atoms/Text';

const ValorationContainer = () => {
  const handleChange = e => {
    //Utilizar la de recoil
    //setValoracion({ ...valoracion, [e.target.id]: e.target.value });
  };

  return (
    <>
      <TextBlue>Valoración</TextBlue>
      <TextContainer> {ValText} </TextContainer>
      <ValInput id="valoracion_P_1" onChange={handleChange} />
      <TextContainer> {ValRes} </TextContainer>
      <ValInput id="valoracion_P_2" onChange={handleChange} />
      <TextContainer> {ValRes2} </TextContainer>
      <ValInput id="valoracion_P_3" onChange={handleChange} />
    </>
  );
};

export default ValorationContainer;
