export interface ProfessorRow {
  nombre: string;
  id: string;
  tipo_participacion: string;
  unidad: string;
  porcentaje_participacion: number | 'N/A';
  enlaces?: JSX.Element;
}
