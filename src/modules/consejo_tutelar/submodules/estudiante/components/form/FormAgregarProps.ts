import {
  PersonalAcademico,
  AsesorExterno,
} from '@modules/consejo_tutelar/types';

type FormAgregarProps = {
  personal: PersonalAcademico[];
  open: boolean;
  handleClose: () => void;
  onSubmit: (
    integrante: PersonalAcademico | AsesorExterno,
    file?: File
  ) => void;
};
export default FormAgregarProps;
