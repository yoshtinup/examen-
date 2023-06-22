import { ApiQuerys } from '@shared/queries';

interface DatosMessage {
  message?: string;
}
class RevisionCURPQuerys extends ApiQuerys {
  async getSolicitarRevisionCURP(): Promise<any> {
    
    const status = await this.api<{ data: DatosMessage }>(`solicitarRevisionCURP`);
    console.log(status);
    return status;
    
  }
}
const url = process.env.API_URL + '/generales/serviciosescolares/';
export default new RevisionCURPQuerys(url);
