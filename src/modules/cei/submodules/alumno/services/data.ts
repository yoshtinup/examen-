import {
  EstatusItemProps,
  PreguntaItemProps,
  AlumnoDetallesItemProps,
  AlumnoWithoutPropuestaProps,
  LoginProps,
  ShowInterface,
} from '../__generated__/globalTypes';
import http from './http-common';
import httpFileUpload from './http-file-upload';
import httpLogin from './http-login';

class DataService {
  getPropuestaAlumno(id: string) {
    return http
      .get<AlumnoDetallesItemProps[]>(`/propuestas/${id}`)
      .catch(() => {});
  }

  getAlumno() {
    return http.get<AlumnoWithoutPropuestaProps>(`/alumno`).catch(() => {});
  }

  getEstatus() {
    return http.get<Array<EstatusItemProps>>('/estatus');
  }

  getEstatusEvaluacion() {
    return http.get<Array<EstatusItemProps>>('/estatus/evaluacion');
  }

  getPreguntas() {
    return http.get<Array<PreguntaItemProps>>('/preguntas').catch(() => {});
  }

  enviarEvaluacion(data: FormData) {
    return httpFileUpload.post<{ status: string }>('/propuestas', data);
  }

  guardarTemporal(data: FormData) {
    return httpFileUpload.post<{ status: string }>(
      '/propuestas?temp=true',
      data
    );
  }

  login(email: string) {
    return httpLogin.post<LoginProps>(
      `/Login/validacion_Autorizacion?Email=${email}`
    );
  }

  getInterfaceRules() {
    return http.get<ShowInterface>('/alumno/rulesshowinterface');
  }
}

export default new DataService();
