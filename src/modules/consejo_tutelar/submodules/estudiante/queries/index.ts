import { useQuery } from 'react-query';

import { PersonalAcademicoGql, AsesorExternoGql, AsesoresGql } from '../types';
import {
  PersonalAcademico,
  AsesorExterno,
} from '@modules/consejo_tutelar/types';
import { hasuraClient } from '@shared/queries';
import { gql } from 'graphql-request';

export function getGrado(grado: number): 'maestria' | 'doctorado' {
  const maestria = [1, 4, 6];
  // FIXME: Si se agregan mas doctorados descomentar esta linea y programar su validacion
  /* const doctorado = [2] */
  if (maestria.includes(grado)) return 'maestria';
  return 'doctorado';
}

export function useGetListaPersonalInterno(IdGrado: number) {
  return useQuery(['ct-personal-interno', IdGrado], async () => {
    const { personal } = await hasuraClient.request(
      gql`
        query ObtenerAsesores($IdGrado: Int!) {
          personal: CTAsesores(
            where: { IdGrado: { _gte: $IdGrado }, Unidad: { _neq: "Externo" } }
          ) {
            id
            nombre
            apellidoPaterno
            apellidoMaterno
          }
        }
      `,
      { IdGrado }
    );
    return personal;
  });
}

export function useGetListaPersonalExterno(IdGrado: number) {
  return useQuery(['ct-personal-externo', IdGrado], async () => {
    const { personal } = await hasuraClient.request(
      gql`
        query ObtenerAsesores($IdGrado: Int!) {
          personal: CTAsesores(
            where: { IdGrado: { _gte: $IdGrado }, Unidad: { _eq: "Externo" } }
          ) {
            id
            nombre
            apellidoPaterno
            apellidoMaterno
          }
        }
      `,
      { IdGrado }
    );
    return personal;
  });
}

type ConformacionCTAlumno = {
  internos: PersonalAcademico[];
  externos: AsesorExterno[];
};

function convertConformacionCTAlumno(
  data: AsesoresGql[]
): ConformacionCTAlumno {
  const internos = data[0].AsesoresInternos.map(
    (interno: PersonalAcademicoGql) => ({
      id: interno.id,
      nombre: interno.dataPersona.nombre,
      apellidoMaterno: interno.dataPersona.ApellidoMaterno,
      apellidoPaterno: interno.dataPersona.ApellidoPaterno,
    })
  );
  const externos = data[0].AsesoresExternos.map(
    (externo: AsesorExternoGql) => ({
      id: externo.id,
      nombre: externo.dataPersona.nombre,
      apellidoMaterno: externo.dataPersona.ApellidoMaterno,
      apellidoPaterno: externo.dataPersona.ApellidoPaterno,
      email: externo.dataPersona.Email,
      institucion: externo.dataPersona.Institucion,
      grado: externo.dataPersona.Grado,
      idParticipacion: externo.idParticipacion,
      argumentacion: externo.datosExtra?.Argumentacion ?? '',
      fileName: externo.datosExtra?.UrlCV ?? '',
      idGenero: 0,
      codirectorInfo: {
        sNI: externo.codirectorInfo?.SNI,
        numPubArb: externo.codirectorInfo?.NumPubArb,
        numEstMaestria: externo.codirectorInfo?.NumEstMaestria,
        numEstDoc: externo.codirectorInfo?.NumEstDoc,
      },
    })
  );
  return {
    internos: internos,
    externos: externos,
  };
}

export function useGetAlumnoCT(matricula: number) {
  return useQuery(
    ['ct-conformacion-alumno', matricula],
    async () => {
      const { result } = await hasuraClient.request(
        gql`
          query getCT($matricula: Int!) {
            result: AlumnoPrograma(where: { Matricula: { _eq: $matricula } }) {
              AsesoresInternos: TutoresSinodales(
                where: {
                  IdParticipacion: { _nin: 1 }
                  PersonalAcademico: { IdUnidad: { _nin: 6 } }
                }
              ) {
                id: IdTutorSinodal
                dataPersona: PersonalAcademico {
                  nombre: Nombre_s_
                  ApellidoMaterno
                  ApellidoPaterno
                }
              }
              AsesoresExternos: TutoresSinodales(
                where: {
                  IdParticipacion: { _nin: 1 }
                  PersonalAcademico: { IdUnidad: { _in: 6 } }
                }
              ) {
                id: IdTutorSinodal
                dataPersona: PersonalAcademico {
                  nombre: Nombre_s_
                  ApellidoMaterno
                  ApellidoPaterno
                  Institucion: Division
                  Email
                  Grado
                }
                idParticipacion: IdParticipacion
                datosExtra: db18_CT_DatosExtrasAsesoresExterno {
                  Argumentacion: Argumentacion
                  UrlCV
                }
                codirectorInfo: db18_CT_DatosExtrasCodirectore {
                  SNI
                  NumEstDoc
                  NumEstMaestria
                  NumPubArb
                }
              }
            }
          }
        `,
        { matricula }
      );
      return result;
    },
    { select: convertConformacionCTAlumno }
  );
}
