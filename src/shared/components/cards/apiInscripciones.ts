
import { ApiQuerys } from '@shared/queries';

class InscripcionesQuerys extends ApiQuerys {
  async getInscripcionEstudiante(idBoletaInscripcion): Promise<string[]> {
    const status = await this.api<{ data: string[] }>(`?IdBoletaInscripcion=${idBoletaInscripcion}`);
    return status.data;
  }

}

const url = process.env.API_URL + '​/inscripciones​/inscribir_estudiante';
export default new InscripcionesQuerys(url);
