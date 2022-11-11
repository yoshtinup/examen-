import Cookies from 'js-cookie';

/**
 * Clase que encapsula las consultas del Procesos de conformacion de CT
 * @author Diego Cruz Aguilar
 * @constructor (string) recibe un token para realizar la solicitudes http
 */
class ApiQuerys {
  private _baseUrl = 'https://localhost:7241/consejo_tutelar/';
  private _token: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this.updateToken();
  }

  updateToken() {
    const token = Cookies.get('ecosurToken');
    this._token = `Bearer ${token}`;
  }

  /**
   * @template T - Tipo de dato usado para mapear la respuesta de la api
   * @param endpoint - url de consulta
   * @param requestProps - Propriedades de la solicitud
   * @returns (promise<T>) retorna el tipo de la template o un error
   */
  protected async api<T>(
    endpoint: string,
    requestProps: RequestInit = {
      method: 'GET',
      headers: { Authorization: this._token },
    }
  ): Promise<T> {
    const url: string = this._baseUrl + endpoint;
    return fetch(url, requestProps).then(
      response => response.json() as Promise<T>
    );
  }

  /**
   * Crear RequestInit para consulta
   * @param data - objeto a conversir en JSON
   * @returns (RequestInit) informacion de la consulta PUT
   */
  protected getJsonRequest(data: any, method: 'POST' | 'PUT'): RequestInit {
    return {
      method: method,
      headers: {
        Authorization: this._token,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    };
  }

  protected getFormRequest(
    data: FormData,
    method: 'POST' | 'PUT'
  ): RequestInit {
    console.log(this._token);
    return {
      method: method,
      headers: {
        Authorization: this._token,
      },
      body: data,
    };
  }
}
export default ApiQuerys;
