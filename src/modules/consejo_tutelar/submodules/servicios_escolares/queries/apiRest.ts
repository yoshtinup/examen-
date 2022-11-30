import { ApiQuerys } from '@shared/queries';

class ServiciosEscolaresQuerys extends ApiQuerys {
  async sendGeneral(Ids: any[]): Promise<any> {
    const data: RequestInit = {
      body: JSON.stringify(Ids),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };
    const result = await this.api<{ data: any }>(
      'notificaPendientesPorEstatusConformacion',
      data
    );
    return result.data;
  }

  async sendSpecific(Ids: any[]): Promise<any> {
    const data: RequestInit = {
      body: JSON.stringify(Ids),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };
    const result = await this.api<{ data: any }>(
      'notificaPendientesPorEstatusConformacion',
      data
    );
    return result.data;
  }
}

const url = process.env.API_URL + '/consejo_tutelar/';
export default new ServiciosEscolaresQuerys(url);
