import Swal, { SweetAlertOptions } from 'sweetalert2';

const message = (error: boolean = false) => {
  let msg: SweetAlertOptions = {
    icon: 'success',
    title: 'Evaluación completada',
    text: 'Su evaluación se guardó de forma correcta',
  };
  if (error)
    msg = {
      icon: 'error',
      title: 'Error',
      text: 'No se guardó la evaluación, verifique que no haya evaluado previamente',
    };
  Swal.fire(msg);
};
export default message;
