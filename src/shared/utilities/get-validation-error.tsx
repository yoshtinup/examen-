import { TypeWithKey } from '../../modules/cei/submodules/alumno/models/type-with-key';

export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    'Not Found': 'Recurso no encontrado',
    Unauthorized: 'No tienes permiso para acceder a este recurso.',
    'Error: Request failed with status code 403': 'Usted no cuenta con acceso',
    Forbidden: 'No cuentas con acceso a este recurso.',
    'Bad Request': 'Ocurrio un inconveniente al procesar la solicitud',
  };
  return codeMatcher[errorCode];
};
