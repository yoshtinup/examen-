export interface Evaluaciones {
    data: Data;
}

export interface Data {
    EnProceso: EnProceso[];
    Concluido: Concluido[];
}

export interface Concluido {
    IdEvaluacion: number;
    Alumno:       Alumno;
}

export interface Alumno {
    Programa: AlumnoPrograma;
    Materia:  Materia;
}

export interface Materia {
    Data: DataClass;
}

export interface DataClass {
    Detalles: Detalles;
    Periodo:  Periodo;
}

export interface Detalles {
    Nombre: DetallesNombre;
}

export enum DetallesNombre {
    SeminarioDeInvestigaciónDoctoralII = "Seminario de investigación doctoral II",
    SeminarioDeInvestigaciónDoctoralIV = "Seminario de investigación doctoral IV",
    SeminarioDeInvestigaciónDoctoralVI = "Seminario de investigación doctoral VI",
    SeminarioDeInvestigaciónDoctoralVII = "Seminario de investigación doctoral VII",
    SeminarioDeInvestigaciónDoctoralVIII = "Seminario de investigación doctoral VIII",
    SeminarioDeInvestigaciónDoctoralX = "Seminario de investigación doctoral X",
    SeminarioDeInvestigaciónII = "Seminario de investigación II",
    SeminarioDeInvestigaciónV = "Seminario de investigación V",
    SeminarioDeInvestigaciónVIII = "Seminario de investigación VIII",
}

export interface Periodo {
    Trimestre: Trimestre;
    Fecha:     Fecha;
}

export interface Fecha {
    Inicio: string;
    Fin:    string;
    Anio:   Anio;
}

export interface Anio {
    Value: number;
}

export enum Trimestre {
    CuartoSemestre = "Cuarto Semestre",
    DécimoSemestre = "Décimo Semestre",
    NovenoCuatrimestre = "Noveno Cuatrimestre",
    OctavoSemestre = "Octavo Semestre",
    SegundoSemestre = "Segundo Semestre",
    SextoCuatrimestre = "Sexto Cuatrimestre",
    SextoSemestre = "Sexto Semestre",
    TercerCuatrimestre = "Tercer Cuatrimestre",
}

export interface AlumnoPrograma {
    Programa:          ProgramaPrograma;
    UnidadAdscripcion: UnidadAdscripcion;
    datos:             Datos;
}

export interface ProgramaPrograma {
    Value: Value;
}

export enum Value {
    DoctoradoEnCienciasEnEcologíaYDesarrolloSustentable = "Doctorado en Ciencias en Ecología y Desarrollo Sustentable",
    MaestríaEnCienciasEnRecursosNaturalesYDesarrolloRural = "Maestría en Ciencias en Recursos Naturales y Desarrollo Rural",
}

export interface UnidadAdscripcion {
    ID:     number;
    Nombre: UnidadAdscripcionNombre;
}

export enum UnidadAdscripcionNombre {
    Campeche = "Campeche",
    Chetumal = "Chetumal",
    SANCristóbal = "San Cristóbal",
    Tapachula = "Tapachula",
    Villahermosa = "Villahermosa",
}

export interface Datos {
    Nombre:          string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
}

export interface EnProceso {
    IdEvaluacion: number;
    estatus:      Estatus;
    Alumno:       Alumno;
}

export interface Estatus {
    Descripcion: string;
}
