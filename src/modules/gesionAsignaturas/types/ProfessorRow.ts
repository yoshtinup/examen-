export interface ProfessorRow {
  email: string;
  nombre: string;
  id: number;
  tipo_participacion: string;
  unidad: string;
  porcentaje_participacion: number | 'N/A';
  enlaces?: JSX.Element;
}
