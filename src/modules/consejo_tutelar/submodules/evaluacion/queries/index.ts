import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '@shared/queries';
import { ExtraInfoAlumnoCTGql, Rechazados } from '../types';

export function useGetEstudianteCTExtraInfo(matricula: number) {
  return useQuery<ExtraInfoAlumnoCTGql[]>(
    ['ct-estudiante-extra-info', matricula],
    async () => {
      const { Alumno } = await hasuraClient.request(
        gql`
          query cartaAlumnoCT($matricula: Int!) {
            Alumno: db18_vw_CTAlumnos(
              where: { Matricula: { _eq: $matricula } }
              limit: 1
            ) {
              CartaAceptacion
              EstatusGeneral
              LeyendaEstatusGeneral
            }
          }
        `,
        { matricula }
      );
      return Alumno;
    }
  );
}

export function useGetIntegrantesCTRechazados(matricula: number) {
  return useQuery<Rechazados[]>(
    ['ct-estudiante-rechazados', matricula],
    async () => {
      const { CT } = await hasuraClient.request(
        gql`
          query integrantesCTRechazados($matricula: Int!) {
            CT: db18_CT_Conformacion(
              where: { Matricula: { _eq: $matricula } }
            ) {
              Rechazados: db18_CT_IntegrantesRechazados {
                RazonRechazo
                Ronda
                RolQueRechazo: Rol
                Academico: db17_PersonalAcademico {
                  ApellidoPaterno
                  ApellidoMaterno
                  Nombre: Nombre_s_
                  Grado
                }
              }
            }
          }
        `,
        { matricula }
      );
      return CT;
    }
  );
}
