import { ApiQuerys } from "@shared/queries";

class EvaluacionDocenteQuerys extends ApiQuerys{
    async getObtenerDatos(idMateriasOfertaAnual): Promise<string[]>{
        const datosMateria = await this.api<{data: string []}>(
        `EstudianteInterno/obtenerDatos?idMateriasOfertaAnual=${idMateriasOfertaAnual}`
        );
        return datosMateria.data;
    }
}

const url = process.env.API_URL + '/evaluaciondocente/';
export default new EvaluacionDocenteQuerys(url);