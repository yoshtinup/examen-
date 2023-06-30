import { ApiQuerys } from '@shared/queries';
import Swal from 'sweetalert2';

class ProfesorConstanciaParticipacion extends ApiQuerys {
  async generar(idMOA): Promise<any> {
    try {
      const response = await this.api(
        'generar_constancias_participacion_docente?idMOA=1',
        this.getFormRequest(new FormData(), 'POST')
      );
      console.log(response);
      return response;
    } catch (e) {
      Swal.showValidationMessage(`Error al generar la carta: ${e}`);
    }
  }
}

const url = process.env.API_URL + '/Profesor/';
export default new ProfesorConstanciaParticipacion(url);
