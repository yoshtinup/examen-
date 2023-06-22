import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Controller, UseFormSetValue, Control } from 'react-hook-form';
import { FormStructureProps } from '@moduleCEIAlumnos/__generated__/globalTypes';

interface CheckboxProps {
  label: string;
  name: any;
  value: string;
  control: Control<FormStructureProps>;
  setValue: UseFormSetValue<FormStructureProps>;
}

/**
 * Componente que controla la insersion de valores de un Checkbox
 * @param
 * @returns
 */
const FormInputCheckbox: React.FC<CheckboxProps> = ({
  label,
  name,
  value,
  control,
  setValue,
}) => {
  const [checked, setChecked] = useState<string>(value);

  // Asignar valores asimilados por la bd
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked as boolean) {
      setChecked('Si');
    } else {
      setChecked('No');
    }
  };

  useEffect(() => {
    setValue(name, checked);
  }, [checked]);

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={({}) => (
              <Checkbox checked={checked === 'Si'} onChange={handleChange} />
            )}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default FormInputCheckbox;
