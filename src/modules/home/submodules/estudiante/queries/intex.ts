import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { hasuraClient } from '../../../../../shared/queries/graphQlClient';

export function useUpdateEmail(idAlumno: number, email: string) {
  return useQuery(['data-info', idAlumno, email], async () => {
    const { update_Alumnos } = await hasuraClient.request(
      gql`
        mutation UpdateEmail($idAlumno: Int!, $email: String!) {
            update_Alumnos(where: {IdAlumno: {_eq: $idAlumno}}, _set: {CorreoElectronico: $email}){
            affected_rows
          }
        }   
      `,
      { idAlumno, email }
    );
    return update_Alumnos;
  }, {
    enabled: false,
    refetchOnWindowFocus: false,
  });
}
