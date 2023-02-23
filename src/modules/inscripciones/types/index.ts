export interface EstudiantePendiente {
    data: Data;
}

export interface Data {
    Inscripcion: Inscripcion[];
}

export interface Inscripcion {
    Estudiante:             string;
    Matricula:              number;
    emailEstudiante:        string;
    Programa:               string;
    UnidadAdscripcion:      string;
    Curso:                  string;
    Clave:                  string;
    Creditos:               number;
    Materia:                string;
    Cuatrimestre:           string;
    FechaInicioInscripcion: string;
    FechaFinInscripcion:    string;
    Iniciocurso:            string;
    Fincurso:               string;
}

export interface ProgramaUnidad {
    label: string;
    value: any;
  }