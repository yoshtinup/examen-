import Swal from 'sweetalert2';
import { TextDocContainer, TextStrongBlue } from '../atoms/Styles';
import FormEvaluacion from './FormEvaluacion';
import ReactDOMServer from 'react-dom/server';

const DocContainer = () => {
  const handleClick = profesor => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <FormEvaluacion profesor={profesor} />
    );
    Swal.fire({
      width: '75%',
      //grow: 'fullscreen',
      padding: '5rem',
      html: html,
      showCancelButton: false,
      showConfirmButton: false,
    });
  };

  return (
    <>
      {/*
        profesores.map((elm, i) => (
          <TextDocContainer key={i}>
            {elm.name}{' '}
            <TextStrongBlue onClick={() => handleClick(elm)}>
              {' '}
              Evaluar{' '}
            </TextStrongBlue>
            <TextStrongBlue>Ver </TextStrongBlue>
            <TextStrongBlue>Eliminar </TextStrongBlue>
          </TextDocContainer>
        ))*/}
    </>
  );
};

export default DocContainer;
