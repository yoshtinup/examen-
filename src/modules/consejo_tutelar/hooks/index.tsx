import Swal from 'sweetalert2';
export function showLoading(msg: string) {
  Swal.fire({
    title: 'Cargando',
    html: msg,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading(null);
    },
  });
}
