import { ApiQuerys } from '@shared/queries';
import { DocentesState } from '../types/evaluacionState';

class EvaluacionDocenteQuerys extends ApiQuerys {
  async getObtenerDatos(idMateriasOfertaAnual): Promise<any> {
    const datosMateria = await this.api<{data: DocentesState;}>
    (`obtenerDatos?idMateriasOfertaAnual=${idMateriasOfertaAnual}`);
    console.log('Materia:', datosMateria);
    return datosMateria;
  }

  async sendEvaluacion(data: object[]): Promise<any> {
    const res: RequestInit = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuLmd1dGllcnJlekBndWVzdC5lY29zdXIubXgiLCJyb2wiOiJJbnRlcm5vIiwibmJmIjoxNjc4OTQzMDU4LCJleHAiOjE2ODE2MjE0NTgsImlhdCI6MTY3ODk0MzA1OH0.SMiYcxhz7dd2gz6KHwwN1zxhBRlMAvCGlHfsYm8mOXw',
      },
      method: 'POST',
    };
    const result = await this.api<{ res: any }>('guardarEvaluacion', res);
    console.log(result.res);
    
    return result.res;
  }
}

const url = process.env.API_URL + '/EvaluacionDocente/EstudianteInterno/';
export default new EvaluacionDocenteQuerys(url);
