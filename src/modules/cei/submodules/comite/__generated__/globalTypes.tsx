/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================
// import {ComponentType} from "react";
// import React from "react";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponseWithoutToken {
  id: number;
  role: string;
}

export interface LoginResponse extends LoginResponseWithoutToken {
  token: string;
}

export interface Numeralia {
  actuales: number;
  anteriores: number;
}

export interface AlertMessageProps {
  severity: 'error' | 'info' | 'success' | 'warning';
  message: string;
}

export interface RechazarProps {
  idPropuesta: number;
  tesis: string;
  observacion: string;
}

//
// Alumnos types
//

interface AlumnoGenericProps {
  id?: number;
  idPropuesta: number;
  matricula: number;
  nombre?: string;
  programa?: string;
  orientacion?: string;
  unidad?: string;
  estatus?: string;
  fechaEnvio?: Date;
}

export interface EvaluadorItemProps {
  estatus: string;
  nombre: string;
}

export interface PreguntaItemProps {
  id: number;
  orden: number;
  label: string;
  level: number | null;
  type: string;
  options: string;
  parent: number;
  current_value: string;
}

export interface SugerenciaItemProps {
  name: string;
  date: Date;
  text: string;
}

export interface DocumentoItemProps {
  id: number;
  url: string;
  name: string;
  historico: boolean;
}

export interface EvaluadorItemProps {
  id: number;
  nombre: string;
  estatus: string;
}

export interface AlumnoItemProps extends AlumnoGenericProps {
  periodo?: string;
  evaluadores?: Array<EvaluadorItemProps>;
}

export interface AlumnoDetallesItemProps extends AlumnoGenericProps {
  apelacion: string;
  titulo?: string;
  director?: string;
  historico?: boolean;
  preguntas?: Array<PreguntaItemProps>;
  sugerencias?: Array<SugerenciaItemProps>;
  documentos?: Array<DocumentoItemProps>;
  evaluadores?: Array<EvaluadorItemProps>;
}

//
// End Alusmnos types
//

//
// Estatus type
//

export type EstatusItemProps = {
  id: number;
  descripcion: string;
};

export type EstatusItemSetProps = {
  idPropuesta: number;
  matricula: number;
  idEstatus: number;
  observaciones: string;
};

//
// End Estatus type
//

//
// Evaluador type
//

export interface EvaluadorItemProps {
  id: number;
  nombre: string;
}

export interface AsignEvaluadorProps {
  matricula: number;
  idFormulariosRespuestas: number;
  idintegrantesComiteEtica: number;
  idEstatusRevision: number;
}

export interface EliminarEvaluadorProps {
  idFormularioRespuesta: number;
  idPersonalAcademico: number;
}

export interface FetchAlumnosPropuestas {
  cursor: number;
  data: AlumnoItemProps[];
}
//
// End Evaluador type
//

//==============================================================
// END Enums and Input Objects
//==============================================================
