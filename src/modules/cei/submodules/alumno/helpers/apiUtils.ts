import DataService from '../services/data';
import { AlumnoDetallesItemProps } from '../__generated__/globalTypes';

/**
 * Retorna la informacion de una matrivula por medio de la matricula
 * si la propuesta un no exite consulta otro endpoint de la api y asigna
 * genrico a los valores faltantes
 * @param {string} matricula
 * @returns
 */
export async function getPropuestaAlumno(
  matricula: string
): Promise<[AlumnoDetallesItemProps[], boolean]> {
  const alumnoPropuesta = await DataService.getPropuestaAlumno(matricula);
  if (alumnoPropuesta.data.length === 0) {
    const alumnoInfo = await DataService.getAlumno();
    return [
      [
        {
          ...alumnoInfo.data,
          idPropuesta: 0,
          apelacion: '',
          historico: false,
          preguntas: [],
          sugerencias: [],
          documentos: [],
        },
      ],
      false,
    ];
  }
  return [alumnoPropuesta.data, true];
}
