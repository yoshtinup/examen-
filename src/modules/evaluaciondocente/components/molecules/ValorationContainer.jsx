import { TextBlue } from '../atoms/Styles';
import { ValoracionQuestions } from '../atoms/Text';
import TextValoration from '../atoms/TextValoration';

const ValorationContainer = ({ error }) => {
  return (
    <>
      <h3>Valoración</h3>
      {ValoracionQuestions.map(val => {
        const inputErrorMesssage = '';
        if (error.length > 0) {
          const inputError = error.find(
            x =>
              x.error.toLowerCase().includes(val.id.toLocaleLowerCase()) ===
              true
          );
          inputErrorMesssage = inputError ? inputError.message : null;
        }
        return (
          <TextValoration
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

export default ValorationContainer;
