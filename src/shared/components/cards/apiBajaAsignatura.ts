import { ApiQuerys } from '@shared/queries';

interface DatosMessage {
  message?: string;
}
class AsignaturaQuerys extends ApiQuerys {
  async getBajaAsignatura(idMateriaOfertaAnual, justificacion): Promise<any> {
    const status = await this.api<{ data: DatosMessage }>(
      `baja_asignatura`,  {
        method: 'POST',
        body: JSON.stringify({ idMateriasOfertaAnual: idMateriaOfertaAnual, justificacion: justificacion }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return status;
  }
}

const url = 'https://e57ff2a7-bd83-4dad-a8ff-a88d6df5c1f6.mock.pstmn.io/Operaciones/';
export default new AsignaturaQuerys(url);
