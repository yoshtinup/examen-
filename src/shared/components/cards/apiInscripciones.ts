
import { ApiQuerys } from '@shared/queries';

class InscripcionesQuerys extends ApiQuerys {
  async getPrueba(): Promise<string[]> {
    const status = await this.api<{ data: string[] }>(`prueba`);
    return status.data;
  }
}

const url = process.env.API_URL + '/';
export default new InscripcionesQuerys(url);
