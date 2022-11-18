import { string } from "yup";

export interface ActividadesEstudiante {
    data: Actividad;
}

export interface Actividad {
    evaluacion: Evaluacion[];
}

export interface Evaluacion {
    IdAlumnosMaterias:   number;
    idEvaluacion:        number;
    estatus:             Estatus;
    publicaciones:       Publicacion[];
    cursos:              Curso[];
    programaactividades: Programaactividades[];
    estancias:           Estancia[];
    congresos:           Congreso[];
}

export interface Congreso {
    titulo:            string;
    tipoparticipacion: string;
    lugar:             string;
    fecha:             string;
}

export interface Publicacion {
    titulo:            string;
    Annio:             number;
    publicadoen:       string;
    tipoparticipacion: string;
    tipoarbitrado:     string;
}

export interface Curso {
    nombrecurso:     string;
    fechainicio:     string;
    Fechaconclusion: string;
    institucion:     string;
}

export interface Estancia {
    centro:             string;
    area:               string;
    ambito:             string;
    fechainicio:        string;
    fechaconclusion:    string;
}

export interface Estatus {
    value: string;
}

export interface Programaactividades {
    actividad: string;
    meses:     string;
}

export interface ActividadInfo {
    publicaciones: Array<Publicacion>,
    congresos: Array<Congreso>,
    estancias: Array<Estancia>,
    cursos: Array<Curso>,
};