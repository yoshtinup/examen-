import { TypeWithKey } from '../../modules/cei/submodules/alumno/models/type-with-key';

export const getValidationError = (errorCode: any) => {
  console.log('errorCode ', errorCode);
  const codeMatcher: TypeWithKey<string> = {
    'Not Found': 'Recurso no encontrado',
    Unauthorized:
      'No tienes permiso para acceder a este recurso. Intenta con iniciar sesión',
    'Error: Request failed with status code 403': 'Usted no cuenta con acceso',
  };
  return codeMatcher[errorCode];
};
