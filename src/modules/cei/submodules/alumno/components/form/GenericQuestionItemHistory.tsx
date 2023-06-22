import React from "react";
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';

type HistoryAnwersProps={
  label: string,
  options: string,
  value: string,
  type: string,
}

export const GenericQuestionItemHistory: React.FC<HistoryAnwersProps> = ({
  label,
  options,
  value,
  type,
}) => {

  const generateRadioOptions = () => (
    options.split(',').map((singleOption: string) => (
      <FormControlLabel
        key={`${uuidv4()}`}
        value={ singleOption }
        disabled
        control={<Radio />}
        label={ singleOption }
      />
    )))

  const radioComponent = () => (
    <React.Fragment key={`${uuidv4()}`}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        aria-label={label.toLowerCase()}
        value={value}>
        {generateRadioOptions()}
      </RadioGroup>
    </React.Fragment>
  )

  const inputComponent = () => (
    <React.Fragment key={`${uuidv4()}`}>
      <FormLabel component="legend">{label}</FormLabel>
      <TextField
        defaultValue={value}
        variant="filled"
        size="small"
        fullWidth
        hiddenLabel
        disabled
      />
    </React.Fragment>
  )

  const checkComponent = () => (
    <FormControlLabel
      disabled
      checked={value == "Si"}
      control={<Checkbox />}
      label={label}
    />
  )

  const labelComponent = () => (<FormLabel component="legend">{label}</FormLabel>)

  const component: any = {
    radio: radioComponent,
    input: inputComponent,
    check: checkComponent,
    label: labelComponent
  }

  return (
    <React.Fragment key={`${uuidv4()}`}>
      {component[type]?.()}
    </React.Fragment>
  );
};
