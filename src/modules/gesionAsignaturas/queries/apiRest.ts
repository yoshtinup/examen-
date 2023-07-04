import { ApiQuerys } from '@shared/queries';
import Swal from 'sweetalert2';

class ProfesorConstanciaParticipacion extends ApiQuerys {
  async generarTodas(idMOA): Promise<any> {
    try {
      const response = await this.api(
        'generar_constancias_participacion_docente?idMOA=' + idMOA,
        this.getFormRequest(new FormData(), 'POST')
      );
      return response;
    } catch (e) {
      Swal.showValidationMessage(`Error al generar la carta: ${e}`);
    }
  }

  async generarIndividual(idDocente): Promise<any> {
    try {
      const response = await this.api(
        'generar_constancias_participacion_docente?idProfesor=' + idDocente,
        this.getFormRequest(new FormData(), 'POST')
      );
      return response;
    } catch (e) {
      Swal.showValidationMessage(`Error al generar la carta: ${e}`);
    }
  }
}

const url = process.env.API_URL + '/Profesor/';
export default new ProfesorConstanciaParticipacion(url);
