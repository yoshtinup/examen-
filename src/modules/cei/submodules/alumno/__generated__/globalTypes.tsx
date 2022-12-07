/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Control } from 'react-hook-form'

//==============================================================
// START Enums and Input Objects
//==============================================================
// import {ComponentType} from "react";
// import React from "react";
export interface DocumentProps {
	idType: number,
	document: string
}

export interface FormStructureProps{
	appeal: string,
	answers: RespuestaItemProps[],
	documentData: Array<File | undefined>
	documents: DocumentProps[]
}

export interface FormProps {
  id: number,
  name: any,
  label: string,
  control: Control<FormStructureProps>,
}


export interface RespuestaItemProps {
  idPlantillaPreguntas: number,
  respuesta: string,
	tipo: string,
	orden: number,
	parent: number,
	condicion: string,
  visible: boolean
}

export interface AlertMessageProps {
  severity: 'error' | 'info' | 'success' | 'warning',
  message: string
}

//
// Alumnos types
//

interface AlumnoProps{
  id?: number,
  matricula: number,
  nombre?: string,
  programa?: string,
  orientacion?: string,
  unidad?: string,
  estatus?: string,
}

export interface AlumnoWithoutPropuestaProps extends AlumnoProps{
  titulo: string,
  director?: string,
}

interface AlumnoGenericProps extends AlumnoProps{
  idPropuesta: number,
  fechaEnvio?: Date,
}

export interface EvaluadorItemProps {
  estatus: string,
  nombre: string
}

export interface FormQuestionProps {
  answers: Array<PreguntaRespuestaItemProps>,
  history: boolean
}

export interface PreguntaItemProps {
  id: number,
  orden: number,
  label: string,
  level: number,
  type: string,
  options: string,
  parent: number,
  condition: string,
}

export interface PreguntaRespuestaItemProps extends PreguntaItemProps {
  current_value: string
}

export interface SugerenciaItemProps {
  name: string,
  date: Date,
  text: string,
}

export interface DocumentoItemProps {
  id: number
  url: string,
  name: string,
  historico: boolean
}

export interface AlumnoItemProps extends AlumnoGenericProps {
  periodo?: string,
  evaluadores?: Array<EvaluadorItemProps>
}

export interface AlumnoDetallesItemProps extends AlumnoGenericProps {
  apelacion: string,
  titulo: string,
  director?: string,
  historico?: boolean,
  preguntas: Array<PreguntaRespuestaItemProps>
  sugerencias: Array<SugerenciaItemProps>
  documentos: Array<DocumentoItemProps>
}

//
// End Alusmnos types
//


//
// Estatus type
//

export type EstatusItemProps = {
  id: number,
  descripcion: string
}

//
// End Estatus type
//

//

//
// Api login types
export type LoginProps = {
  token: string,
  expiration: string
}

//==============================================================
// END Enums and Input Objects
//==============================================================
