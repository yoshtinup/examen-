import { useSnackbar, WithSnackbarProps } from 'notistack';

let useSnackBarRef: WithSnackbarProps;
export const SnackBarUtilitiesConfigurator: React.FC = () => {
  useSnackBarRef = useSnackbar();
  return null;
};

export const SnackBarUtilities = {
  toast(msg: [string[]], variant: 'success' | 'error') {
    useSnackBarRef.enqueueSnackbar(
      <div>
        {msg.map(m => (
          <p>{m}</p>
        ))}
      </div>,
      {
        variant,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }
    );
  },
  success(msg: string[]) {
    this.toast(msg, 'success');
  },
  error(msg: string[]) {
    this.toast(msg, 'error');
  },
};
