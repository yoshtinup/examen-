import Roles from '@definitions/Roles';
import { WithRol } from '@shared/hooks';

// Hook para mostrar solo por rol
export const withPresidenteRole = WithRol(Roles.Presidente_CEI);
export const withEvaluadorRole = WithRol(Roles.Revisor_CEI);
