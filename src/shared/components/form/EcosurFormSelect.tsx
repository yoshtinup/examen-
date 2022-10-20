import React from 'react';
import { SelectProps } from '@mui/material';
import { FieldProps } from 'formik';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type EcosurSelectOptions = {
  value: any;
  label: string;
};

type Props = {
  options: EcosurSelectOptions[];
};

const EcosurFormSelect: React.FC<FieldProps & Props & SelectProps> = props => {

  const { error, field, form, options, ...rest } = props;
  const { setFieldValue } = form
  const { name } = field
  const { label } = rest
  return (
    <FormControl fullWidth>
      <InputLabel id={`ecosur-select-${label}`}>{label}</InputLabel>
      <Select
        labelId={`ecosur-select-${label}`}
        onChange={e => {
          setFieldValue(name, e.target.value);
        }}
        {...field}
        {...rest}
      >
        {options?.map((option: EcosurSelectOptions, index: number) => (
          <MenuItem
            key={`options-${index}-${option.value}`}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EcosurFormSelect;
