import { ApiQuerys } from "@shared/queries";
import { Actividades } from "../submodules/estudiante/types";

class SeminarioInvestigacion extends ApiQuerys {
    async getDatosEvaluacionSeminario(idAlumnoMateria: number): Promise<any>{
        const actividades = await this.api<{data: any}>(
            `ObtenerDatosEvaluacionSeminarios/${idAlumnoMateria.toString()}`
        )
        console.log(actividades)
        return actividades
    }

    async evaluacionSeminario(idAlumnoMateria: number): Promise<any> {
      const data: RequestInit = {
      //   body: JSON.stringify(idAlumnoMateria),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      };
      const result = await this.api<{ data: any }>(
          `${idAlumnoMateria.toString()}`,
          data
      );
      return result.data;
    }

    async guardarActividades(actividades: Actividades): Promise<any> {
      const data: RequestInit = {
        body: JSON.stringify(actividades),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      };
      const result = await this.api<{ data: any }>(
        'guardar',
        data
      );
      return result.data;
    }

    async guardarActividadesPosgrado(actividades: Actividades): Promise<any> {
      const msg = await this.api<Actividades>(
        `guardar`,
        this.getJsonRequest(actividades, 'POST')
      );
      return msg;
    }
    
}

const url = process.env.API_URL + '/EvaluacionSeminariosInvestigacion/Alumno/'
export default new SeminarioInvestigacion(url)