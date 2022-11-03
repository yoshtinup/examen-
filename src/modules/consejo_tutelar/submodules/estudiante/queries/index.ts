import { useQuery } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';

const API_URL = `${process.env.HASURA_URL}`;
const SECRET = `${process.env.HASURA_SECRET}`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    'x-hasura-admin-secret': SECRET,
  },
});

export function useGetListaPersonalInterno(IdGrado: number) {
  return useQuery(['personal-interno', IdGrado], async () => {
    const { personal } = await graphQLClient.request(
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
    const { personal } = await graphQLClient.request(
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
