import withRole from './withRole'

// Hook para mostrar solo por rol
export const withPresidenteRole = withRole('Presidente')
export const withEvaluadorRole = withRole('Evaluador')
