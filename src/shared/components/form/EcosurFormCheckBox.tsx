import { useField } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface IProps {
  label: string;
  name: string;
}

const EcosurFormCheckBox = ({ label, ...rest }: IProps) => {
  const [field] = useField({ ...rest, type: 'checkbox' });

  return (
    <div>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={field.checked}
            onChange={field.onChange}
            id={field.name}
            value={field.value}
          />
        }
      />
    </div>
  );
};

export default EcosurFormCheckBox;
