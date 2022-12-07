import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Controller } from 'react-hook-form';
import { FormProps } from '@moduleCEIAlumnos/__generated__/globalTypes';

const FormInputText = ({ id, name, control, label }: FormProps) => {
  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextareaAutosize
            id={`filled-hidden-label-small-${id}`}
            aria-label="minimum height"
            minRows={3}
            onChange={onChange}
            value={value}
            style={{ width: '100%' }}
          />
        )}
      />
    </FormControl>
  );
};

export default FormInputText;
