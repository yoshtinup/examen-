import { ApiQuerys } from "@shared/queries";
import { Actividades } from "../submodules/estudiante/types";

class SeminarioInvestigacion extends ApiQuerys {
    async getDatosEvaluacionSeminario(idAlumnoMateria: number): Promise<any>{
        const actividades = await this.api<{data: any}>(
            `${idAlumnoMateria.toString()}`
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
}

const url = process.env.API_URL + '/EvaluacionSeminariosInvestigacion/Alumno/ObtenerDatosEvaluacionSeminarios/'
export default new SeminarioInvestigacion(url)