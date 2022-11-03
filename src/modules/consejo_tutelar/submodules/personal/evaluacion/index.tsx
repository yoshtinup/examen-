import React from 'react';
import Comite from './Comite';
import Integrante from './Integrante';
import DirectorTesis from './DirectorTesis';
import { WithRol, WithRoles } from '@shared/hooks/WithRol';
import Roles from '@definitions/Roles';
const ComiteEvaluacionPage = WithRoles([
  Roles.Responsable_Orientacion,
  Roles.Coordinador_Unidad,
  Roles.Coordinacion_General_Posgrado,
])(Comite);

const IntegranteEvaluacionPage = WithRol(Roles.Academico)(Integrante);
const DirectorTesisEvaluacionPage = WithRol(Roles.Academico)(DirectorTesis);

const Evaluacion = () => {
  return (
    <div>
      <ComiteEvaluacionPage />
      <DirectorTesisEvaluacionPage />
      <IntegranteEvaluacionPage />
    </div>
  );
};
export default Evaluacion;
