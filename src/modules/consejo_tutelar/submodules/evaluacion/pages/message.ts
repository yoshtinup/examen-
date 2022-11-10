import Swal, { SweetAlertOptions } from 'sweetalert2';

const message = (error: boolean = false) => {
  let msg: SweetAlertOptions = {
    icon: 'success',
    title: 'Evaluacion completada',
    text: 'Su evaluacion se llevo acabo con exito',
  }
  if (error) msg = {
    icon: 'error',
    title: 'No se pudo realizar la evaluacion',
    text: 'No puedo llevarse acabo esta evaluacion',

  }
  Swal.fire(msg);
};
export default message
