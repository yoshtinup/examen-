import React, { memo } from 'react';

const opcionesEvaluacion = [
  { key: 0, text: '' },
  { key: 5, text: 'Bastante bien, Muy satisfecho/a' },
  { key: 4, text: 'Bien, Bastante satisfecho/a' },
  { key: 3, text: 'Regular, Satisfecho/a' },
  { key: 2, text: 'Mal, Poco satisfecho/a' },
  { key: 1, text: 'Muy mal, Muy insatisfecho/a' },
];

const SelectControl = memo(
  ({ item, state = {}, handleChange = null, id = 0, msgError }) => {
    const idElemento = id.toString();
    let clase =
      state === 0 && msgError
        ? 'alert alert-danger form-select col-8'
        : 'form-select col-8'; //Si tiene valor en el mensajedeerrror y el valor del select es cero se pone en rojo el select
    return (
      <>
        <select
          className={clase}
          aria-label="Default select example"
          value={state}
          onChange={handleChange}
          name={item.key}
          id={idElemento}
        >
          {opcionesEvaluacion.map(opt => (
            <option key={opt.key} value={opt.key}>
              {opt.text}
            </option>
          ))}
        </select>
      </>
    );
  }
);

export default SelectControl;
