import * as React from 'react';
import { InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface EcosurSelectProps {
    handleChange: (event: SelectChangeEvent) => void;
    label: string;
    value: any;
    size?: number;
}

const menuItems = (size: number) => {
  let menuItem = [];
  let currentYear = new Date().getFullYear();
  for (let index = size; index >= 0; index--) {
    menuItem.push(<MenuItem key={`ecosur-menu-item-${index}`} value={currentYear}>{`${currentYear}`}</MenuItem>);
    currentYear--;
  }
    return menuItem;
}

const EcosurSelect = ({label, handleChange, value, size = 10}: EcosurSelectProps) => {
    return (
      <FormControl sx={{ minWidth: 120 }} size='small'>
        <InputLabel id={`ecosur-select-label-${label}`}>{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={`ecosur-select-${label}`}
          value={value}
          label={label}
          autoWidth
          onChange={(event) => {
            handleChange(event);
          }}
        >
          { menuItems(size) }
        </Select>
      </FormControl>
    );
}

export default EcosurSelect;