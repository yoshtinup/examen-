import {
  AlumnoItemProps,
  EstatusItemProps,
  EstatusItemSetProps,
  EvaluadorItemProps,
  AsignEvaluadorProps,
  Numeralia,
	AlumnoDetallesItemProps,
  RechazarProps,
	LoginInput,
	LoginResponse,
	LoginResponseWithoutToken
} from '../__generated__/globalTypes'
import http from "./http-common";

interface FetchAlumnosPropuestas{
  cursor: number,
  data: AlumnoItemProps[]
}

// Conjunto de endpoits de la api usados para este projecto
// Si desea conocer el comportamiento de estos leea la documentacion de la api
class DataService {

	login(data: LoginInput){
		return http.post<LoginResponse>("/comite/login", data)
	}

  loginPresidente(data: LoginInput){
    return http.post<LoginResponse>("/comite/login/presidente", data)
  }

	getLogin(){
		return http.get<LoginResponseWithoutToken>("/comite/login")
	}

  getPropuestasNumeralia() {
    return http.get<Numeralia>('/propuestas/numeralia');
  }

  getPropuestasAlumnos(cursor: number = 0, history: boolean = false) {
    return http.get<FetchAlumnosPropuestas>(`/propuestas?historico=${history}&cursor=${cursor}`);
  }

  getPropuestaAlumno(id: string) {
    return http.get<AlumnoDetallesItemProps[]>(`/propuestas/${id}`);
  }

  getEstatus(){
    return http.get<Array<EstatusItemProps>>('/estatus')
  }

  getEstatusEvaluacion(){
    return http.get<Array<EstatusItemProps>>('/estatus/evaluacion')
  }

  getEvaluadores(){
    return http.get<Array<EvaluadorItemProps>>('/evaluador')
  }

  setEvaluador(data: AsignEvaluadorProps){
    return http.post<Array<EvaluadorItemProps>>('/evaluador', data)
  }

  setEstatus(data: EstatusItemSetProps){
    return http.post<{estatus: string}>('/estatus', data)
  }

  setRechazar(data: RechazarProps){
    return http.post('/evaluador/rechazar', data)
  }

  setEstatusRevision(data: EstatusItemSetProps){
    return http.post<{estatus: string}>('/evaluador/revision', data)
  }

  sendAlumnosPendientes(){
    http.get('/notificacion/pendiente/alumnos')
  }

  sendEvaluadoresPendientes(){
    http.get('/notificacion/pendiente/evaluadores')
  }
}

export default new DataService();
