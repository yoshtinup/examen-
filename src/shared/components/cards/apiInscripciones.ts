import { Message } from '@modules/consejo_tutelar/types';
import { ApiQuerys } from '@shared/queries';
interface DatosMessage {
  message?: string;
}
class InscripcionesQuerys extends ApiQuerys {

  async getInscripcionEstudiante(idBoletaInscripcion): Promise<any> {
    const status = await this.api<{ data: DatosMessage }>(
      `inscribir_estudiante?IdBoletaInscripcion=${idBoletaInscripcion}`
    );
    return status;
  }
  async getInscripcionesNotificacion(idBoletaInscripcion): Promise<any> {
    const status = await this.api<{ data: DatosMessage }>(
      `notificacion/AEstudiante?idBoletasInscripciones=${idBoletaInscripcion}`
    );
    return status;
  }
  async getInscripcionesNotificacionAll(): Promise<any> {
    const status = await this.api<{ data: DatosMessage }>(
      `notificacion/ATodosLosEstudiantes`
    );
    return status;
  }
  //pendiente
  async getCancelarInscricion(idBoletasInscripciones): Promise<Message> {
    const msg = await this.api<Message>(`cancelar_inscripcion?idBoletasInscripciones=${idBoletasInscripciones}`, this.getJsonRequest(idBoletasInscripciones, 'POST'));
    return msg;
  }


}

const url = process.env.API_URL + '/inscripciones/';
export default new InscripcionesQuerys(url);
