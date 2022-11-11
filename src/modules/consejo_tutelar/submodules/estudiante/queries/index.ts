import { useQuery } from 'react-query';
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
  return useQuery(['personal-interno', IdGrado], async () => {
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
  return useQuery(['personal-externo', IdGrado], async () => {
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

export function useGetAlumnoCT(matricula: number) {
  return useQuery(['alumno-ct', matricula], async () => {
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
  });
}
