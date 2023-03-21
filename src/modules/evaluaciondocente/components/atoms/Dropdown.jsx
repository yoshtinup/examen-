import React, { useState } from 'react';
import {
  DropdownButton,
  DropdownContainer,
  TextContainer,
  DropdownList,
  DropdownListItem,
} from './Styles';

const opcionesEvaluacion = [
  { key: 0, text: '' },
  { key: 5, text: 'Bastante bien, Muy satisfecho/a' },
  { key: 4, text: 'Bien, Bastante satisfecho/a' },
  { key: 3, text: 'Regular, Satisfecho/a' },
  { key: 2, text: 'Mal, Poco satisfecho/a' },
  { key: 1, text: 'Muy mal, Muy insatisfecho/a' },
];

const Dropdown = props => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    1: opcionesEvaluacion[0],
    2: opcionesEvaluacion[0],
    3: opcionesEvaluacion[0],
    4: opcionesEvaluacion[0],
  });

  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionClick = (option, questionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option,
    });
    setDropdownVisible(false);
    props.setPlaneacion({ ...props.planeacion, [props.item]: option.key });
  };

  return (
    <>
      <DropdownContainer>
        <DropdownButton onClick={handleDropdownClick}>
          {selectedOptions[1].text || ''}
        </DropdownButton>
        {dropdownVisible && (
          <DropdownList>
            {opcionesEvaluacion.map(option => (
              <DropdownListItem
                key={option.key}
                onClick={() => handleOptionClick(option, 1)}
              >
                {option.text}
              </DropdownListItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    </>
  );
};

export default Dropdown;
