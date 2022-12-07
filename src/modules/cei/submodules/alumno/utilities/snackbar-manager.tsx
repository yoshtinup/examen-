import { useSnackbar } from '@mui/base';

let useSnackBarRef;
export const SnackBarUtilitiesConfigurator: React.FC = () => {
  useSnackBarRef = useSnackbar({});
  return null;
};

export const SnackBarUtilities = {
  toast(msg: string, variant: 'success' | 'error') {
    useSnackBarRef;
  },
  success(msg: string) {
    this.toast(msg, 'success');
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
};
