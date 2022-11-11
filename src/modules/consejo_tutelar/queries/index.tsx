import { ApiQuerys } from '@shared/queries';
import Cookies from 'js-cookie';
import {
  Alumno,
  IntegranteCT,
  SetIntegrantesCTList,
  Message,
  EvaluacionIntegrante,
  EvaluacionComite,
} from '../types';

/**
 * Clase que encapsula las consultas del Procesos de conformacion de CT
 * @author Diego Cruz Aguilar
 * @constructor (string) recibe un token para realizar la solicitudes http
 */
class ConsejoTutelarQuerys extends ApiQuerys {
  /**
   * Consulta la lista de alumnos que cuentan con un consejo tutelar
   * @returns (Promise<Alumno[]>) Retorna la lista de alumnos que cuentan con un ct
   */
  async getAlumnos(isDirectorTesis: boolean): Promise<Alumno[]> {
    const alumnos = await this.api<{ data: Alumno[] }>(
      `alumnos?isDirectorTesis=${isDirectorTesis}`
    );
    return alumnos.data;
  }

  /**
   * Consultar la lista de integrantes de consejo tutelar
   * @param  matricula - Matricula de un estudiante que cuenta con consejo tutelar
   * @returns (Promise<IntegranteCT[]>) Lista de personas integrantes del consejo tutelar de un alumno
   */
  async getIntegrantes(
    matricula: number,
    isDirectorTesis: boolean = false
  ): Promise<IntegranteCT[]> {
    const integrantes = await this.api<{ data: IntegranteCT[] }>(
      `${matricula.toString()}?isDirectorTesis=${isDirectorTesis}`
    );
    return integrantes.data;
  }

  /**
   * Registrar el consejo tutelar de un alumno
   * @param integrantes - Lista de integrantes internos e externos seleccionados como parte de un consejo tutelar
   * @param files - Lista de archivos relacionados con personas externas
   * @returns (Promise<Message>) Mensaje de error o correcto segun corresponda
   */
  async registrar(
    integrantes: SetIntegrantesCTList,
    files: File[]
  ): Promise<Message> {
    const formData: FormData = new FormData();
    formData.append('jsonData', JSON.stringify(integrantes));
    files.forEach((file: File) => {
      formData.append('files', file);
    });
    const data = this.getFormRequest(formData, 'POST');
    const msg = await this.api<Message>('registrar', data);
    return msg;
  }

  /**
   * Evaluacion de aceptacion o rechazo de solitud de un alumno
   * @param matricula - de un alumno con consejo tutelar
   * @param evaluacion - informacion de rechazo o aceptacion
   * @returns (Promise<Message>) Menaeje satisfactorio de error
   */
  async integranteRevisar(
    matricula: number,
    evaluacion: EvaluacionIntegrante
  ): Promise<Message> {
    const integrantes = await this.api<Message>(
      `integrante/revisar/${matricula}`,
      this.getJsonRequest(evaluacion, 'PUT')
    );
    return integrantes;
  }

  /**
   * Notificar el visto bueno del director de tesis
   * @param matricula - de un alumno con consejo tutelar
   * @returns (Promise<Message>) Menaeje satisfactorio de error
   */
  async directorTesisEvaluar(matricula: number): Promise<Message> {
    const msg = await this.api<Message>(`director_tesis/aprobar/${matricula}`);
    return msg;
  }

  /**
   * Evaluacion de un CT por parte del comite de Ecosur
   * @param matricula - de un alumno con consejo tutelar
   * @param evaluacion - informacion de rechazo o aceptacion por integrante de un CT
   * @returns (Promise<Message>) Menaeje satisfactorio de error
   */
  async registrarEvaluacion(
    matricula: number,
    evaluacion: EvaluacionComite[]
  ): Promise<Message> {
    const msg = await this.api<Message>(
      `registrar/evaluacion/${matricula}`,
      this.getJsonRequest(evaluacion, 'POST')
    );
    return msg;
  }
}

/* const { isLoading, isSuccess, isError, data, error, refetch } = */
/* useQuery<Tutorial[], Error>('query-tutorials', fetchTutorials, { enabled: false, retry: 2, onSuccess, onError }); */
export default new ConsejoTutelarQuerys(
  process.env.API_URL + '/consejo_tutelar/'
);
