import { ApiQuerys } from '@shared/queries';

interface Message {
  message?: string;
}

class AsignaturasQuerys extends ApiQuerys {
  async postGenerarConstanciaDeEstudios(matricula: number): Promise<any> {
    const data: RequestInit = {
      method: 'POST',
    };
    const msg = await this.api<Message>(
      `generar_constancia_de_estudios/${matricula}`,
      data
    );
    return msg;
  }
}

const url = process.env.API_URL + '/Asignaturas/';
export default new AsignaturasQuerys(url);
