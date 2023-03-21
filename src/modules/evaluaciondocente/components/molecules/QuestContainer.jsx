import React from 'react';
import Dropdown from '../atoms/Dropdown';
import { TextContainer } from '../atoms/Styles';
import { Quest1, Quest2, Quest3, Quest4 } from '../atoms/Text';

const QuestContainer = props => {
  return (
    <>
      <TextContainer>{Quest1}</TextContainer>
      <Dropdown
        item="P_I_1"
        planeacion={props.planeacion}
        setPlaneacion={props.setPlaneacion}
      />
      <TextContainer>{Quest2}</TextContainer>
      <Dropdown
        item="P_I_2"
        planeacion={props.planeacion}
        setPlaneacion={props.setPlaneacion}
      />
      <TextContainer>{Quest3}</TextContainer>
      <Dropdown
        item="P_I_3"
        planeacion={props.planeacion}
        setPlaneacion={props.setPlaneacion}
      />
      <TextContainer>{Quest4}</TextContainer>
      <Dropdown
        item="P_I_4"
        planeacion={props.planeacion}
        setPlaneacion={props.setPlaneacion}
      />
    </>
  );
};

export default QuestContainer;
