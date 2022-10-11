import { Alumno, IntegranteCT, IntegrantesCTList, Message, EvaluacionIntegrante, EvaluacionComite } from '../types';

/**
  * Clase que encapsula las consultas del Procesos de conformacion de CT
 * @author Diego Cruz Aguilar
 * @constructor (string) recibe un token para realizar la solicitudes http
 */
class ConsejoTutelarQuerys {
  private _baseUrl = 'https://localhost:7241/consejo_tutelar/';
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  /**
   * @template T - Tipo de dato usado para mapear la respuesta de la api
   * @param endpoint - url de consulta
   * @param requestProps - Propriedades de la solicitud
   * @returns (promise<T>) retorna el tipo de la template o un error
   */
  private api<T>(
    endpoint: string,
    requestProps: RequestInit = { method: 'GET', headers: { 'Authorization': this._token} },
  ): Promise<T> {
    const url: string = this._baseUrl + endpoint;
    return fetch(url, requestProps).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
  }

  /**
   * Consulta la lista de alumnos que cuentan con un consejo tutelar
   * @returns (Promise<Alumno[]>) Retorna la lista de alumnos que cuentan con un ct
   */
  async getAlumnos(): Promise<Alumno[]> {
    const alumnos = await this.api<{ data: Alumno[] }>('alumnos');
    return alumnos.data;
  }

  /**
   * Consultar la lista de integrantes de consejo tutelar
   * @param  matricula - Matricula de un estudiante que cuenta con consejo tutelar
   * @returns (Promise<IntegranteCT[]>) Lista de personas integrantes del consejo tutelar de un alumno
   */
  async getIntegrantes(matricula: number): Promise<IntegranteCT[]> {
    const integrantes = await this.api<{ data: IntegranteCT[] }>(
      matricula.toString()
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
    integrantes: IntegrantesCTList,
    files: File[]
  ): Promise<Message> {
    const formData: FormData = new FormData();
    formData.append('jsonData', JSON.stringify(integrantes));
    files.forEach((file: File) => {
      formData.append('files', file);
    });
    const data: RequestInit = {
      method: 'POST',
      body: formData,
    };
    const msg = await this.api<Message>('registrar', data);
    return msg;
  }

  /**
   * Crear RequestInit para consulta
   * @param data - objeto a conversir en JSON
   * @returns (RequestInit) informacion de la consulta PUT
   */
  private _getJsonRequest(data: any): RequestInit {
    return {
      method: 'PUT',
      headers: {
        'Authorization': this._token,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    };

  }

  /**
   * Evaluacion de aceptacion o rechazo de solitud de un alumno
   * @param matricula - de un alumno con consejo tutelar
   * @param evaluacion - informacion de rechazo o aceptacion
   * @returns (Promise<Message>) Menaeje satisfactorio de error
   */
  async integranteRevisar(matricula: number, evaluacion: EvaluacionIntegrante): Promise<Message> {
    const integrantes = await this.api<Message>(`integrante/revisar/${matricula}`, this._getJsonRequest(evaluacion));
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
  async registrarEvaluacion(matricula: number, evaluacion: EvaluacionComite): Promise<Message> {
    const msg = await this.api<Message>(`registrar/evaluacion/${matricula}`, this._getJsonRequest(evaluacion));
    return msg;
  }
}
export default ConsejoTutelarQuerys;
