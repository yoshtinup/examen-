import React, { memo } from 'react';
import { Typography } from '@mui/material';

const PreguntaTextArea = memo(
  ({ item, state = {}, handleChange = null, id = 0, msgError, leyenda }) => {
    const idElemento = id.toString();
    return (
      <form noValidate autoComplete="off">
        <div>
          <Typography variant="body2">{leyenda} </Typography>
          <textarea
            className="form-control"
            rows="3"
            name={item.key}
            id={idElemento}
            value={state}
            onChange={handleChange}
            key={item.key}
          ></textarea>
        </div>
      </form>
    );
  }
);

export default PreguntaTextArea;
