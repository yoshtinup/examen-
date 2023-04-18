import { ApiQuerys } from '@shared/queries';
import { Actividades, DatosMateria } from '../types/evaluacionState';

class EvaluacionDocenteQuerys extends ApiQuerys {
  async getObtenerDatos(idMateriasOfertaAnual): Promise<any> {
    const datosMateria = await this.api<{ data: DatosMateria }>(
      `obtenerDatos?idMateriasOfertaAnual=${idMateriasOfertaAnual}`
    );
    return datosMateria;
  }

  async sendEvaluacion(data: Actividades): Promise<any> {
    const evaluar = await this.api(
      'guardarEvaluacion',
      this.getJsonRequest(data, 'POST')
    );
    return evaluar;
  }
}

const url = process.env.API_URL + '/EvaluacionDocente/EstudianteInterno/';
export default new EvaluacionDocenteQuerys(url);
