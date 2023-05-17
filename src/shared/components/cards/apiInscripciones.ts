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
}

const url = process.env.API_URL + '/inscripciones/';
export default new InscripcionesQuerys(url);
