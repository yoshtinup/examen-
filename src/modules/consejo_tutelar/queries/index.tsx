import { Alumno, IntegranteCT, IntegrantesCTList, Message } from '../types';


class ConsejoTutelarQuerys {
  private _baseUrl = 'https://localhost:7241/consejo_tutelar/';
  private _headers: Headers = new Headers()

  constructor(token: string){
    this._headers.append("Authorization", token)
  }

  private api<T>(
    endpoint: string,
    requestProps: RequestInit = { method: 'GET' }
  ): Promise<T> {
    requestProps.headers = this._headers
    const url: string = this._baseUrl + endpoint;
    return fetch(url, requestProps).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
  }

  async getAlumnos(): Promise<Alumno[]> {
    const alumnos = await this.api<{ data: Alumno[] }>('alumnos');
    return alumnos.data;
  }

  async getIntegrantes(matricula: number): Promise<IntegranteCT[]> {
    const integrantes = await this.api<{ data: IntegranteCT[] }>(
      matricula.toString()
    );
    return integrantes.data;
  }

  async registrar(integrantes: IntegrantesCTList, files: File[]): Promise<Message> {
    const formData: FormData  = new FormData()
    formData.append("jsonData", JSON.stringify(integrantes))
    files.forEach((file: File) => {
      formData.append("files", file)
    })
    const data: RequestInit = {
      method: 'POST',
      body: formData,
    }
    const msg = await this.api<Message>("registrar", data);
    return msg;
  }
}
export default ConsejoTutelarQuerys;
