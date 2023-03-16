import React from "react";
import { TextDocContainer, TextStrongBlue } from "../atoms/Styles";
import { doc1, doc2, doc3 } from "../atoms/Text";

const DocContainer = () => {
  return (
    <>
      <TextDocContainer>
        {doc1}  <TextStrongBlue>Evaluar</TextStrongBlue>{" "}
        <TextStrongBlue> Ver</TextStrongBlue>{" "}
        <TextStrongBlue>Eliminar</TextStrongBlue>{" "}
      </TextDocContainer>
      <TextDocContainer>
        {doc2} <TextStrongBlue>Evaluar</TextStrongBlue>{" "}
        <TextStrongBlue>Ver</TextStrongBlue>{" "}
        <TextStrongBlue>Eliminar</TextStrongBlue>{" "}
      </TextDocContainer>
      <TextDocContainer>
        {doc3} <TextStrongBlue>Evaluar</TextStrongBlue>{"   "}
        <TextStrongBlue>Ver</TextStrongBlue>{" "}
        <TextStrongBlue>Eliminar</TextStrongBlue>{" "}
      </TextDocContainer>
    </>
  );
};

export default DocContainer;
